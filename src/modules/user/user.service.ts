import { Inject, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CustomerEntity } from './entities/user.entity';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';
import { CustomerResponseDTO } from './dto/response-customer.dto';
import { CustomerMainDTO } from './dto/main-customer..dto';
import { CustomNotFoundException, IdParamDto, PaginationRequestDto } from 'src/common';
import { AddressService } from '../address/address.service';
import { PatchAddressDTO } from '../address/dto/patch/patch-address.dto';
import { UserRepository } from './repository/user.repository';
import { CustomConflictException } from 'src/common/exception/conflict.exception';
import { RolesRepository } from '../auth/repository/roles.repository';
import { RolesEntity } from '../auth/entities/role.entity';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { MailService } from '../mail/mail.service';
import { Request } from 'express';
import { CustomerActivityLogService } from '../log/customer-activity-log.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly customerRepo: UserRepository,
    @Inject('RolesRepository') private readonly roleRepo: RolesRepository,
    @InjectQueue('mail') private readonly mailQueue: Queue,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly addressService: AddressService,
    private readonly logService: CustomerActivityLogService,
    private readonly mailService: MailService
  ) { }

  // async create(dto: CreateCustomerDTO): Promise<CustomerResponseDTO> {

  //   const existingCustomer = await this.customerRepo.findOne({
  //     where: { email: dto.email },
  //   });

  //   if (existingCustomer) {
  //     throw new CustomConflictException('Customer with this email already exists');
  //   }

  //   const rawPassword = dto.password || this.generateRandomPassword();
  //   const hashedPassword = await bcrypt.hash(rawPassword, 10);
  //   dto.password = hashedPassword;

  //   const role = await this.roleRepo.findOne({ where: { id: 3 } });
  //   if (!role) {
  //     throw new Error('Role not found');
  //   }
  //   const customer = await this.customerRepo.createUser(dto, role);

  //   await this.mailQueue.add('send-user-welcome', {
  //     email: customer.email,
  //     name: customer.name,
  //     password: rawPassword,
  //   });

  //   return customer;
  // }
  async create(dto: CreateCustomerDTO, req?: Request): Promise<CustomerResponseDTO> {
    const existingCustomer = await this.customerRepo.findOne({
      where: { email: dto.email },
    });

    if (existingCustomer) {
      throw new CustomConflictException('Customer with this email already exists');
    }

    const rawPassword = this.generateRandomPassword();
    dto.password = rawPassword;

    const role = await this.roleRepo.findOne({ where: { id: 3 } });
    if (!role) {
      throw new Error('Role not found');
    }

    const customer = await this.customerRepo.createUser(dto, role);

    await this.mailService.sendWelcomeEmail(
      customer.email,
      customer.name,
      rawPassword,
    );

    try {
      await this.logService.log(
        customer,
        'User Account Created',
        {
          ip: req?.ip || 'unknown',
          userAgent: req?.headers['user-agent'] || 'unknown',
        }
      );
    } catch (err) {
      console.error('Failed to log user creation:', err);
    }

    return this.mapper.map(customer, CustomerEntity, CustomerResponseDTO);
  }

  async getAllUsers(): Promise<CustomerResponseDTO[]> {
    const users = await this.customerRepo.find({ relations: ['address'] });
    if (!users || users.length === 0)
      throw new CustomNotFoundException('No users found');
    const mainDtoList = this.mapper.mapArray(
      users,
      CustomerEntity,
      CustomerMainDTO,
    );
    return this.mapper.mapArray(
      mainDtoList,
      CustomerMainDTO,
      CustomerResponseDTO,
    );
  }

  async getUser(params: IdParamDto): Promise<CustomerResponseDTO> {
    const user = await this.customerRepo.findOne({
      where: { id: params.Id },
      relations: ['address'],
    });
    if (!user) throw new CustomNotFoundException('User not found');
    const mainDto = this.mapper.map(user, CustomerEntity, CustomerMainDTO);
    return this.mapper.map(mainDto, CustomerMainDTO, CustomerResponseDTO);
  }

  async updateUser(
    params: IdParamDto,
    dto: UpdateCustomerDTO,
  ): Promise<CustomerResponseDTO> {
    const existing = await this.customerRepo.findOne({
      where: { id: params.Id },
      relations: ['address'],
    });
    if (!existing) throw new CustomNotFoundException('User  not found');
    const updatedUser = await this.customerRepo.update(params.Id, dto);
    const mainDto = this.mapper.map(
      updatedUser,
      CustomerEntity,
      CustomerMainDTO,
    );
    return this.mapper.map(mainDto, CustomerMainDTO, CustomerResponseDTO);
  }

  async deleteUser(params: IdParamDto): Promise<void> {
    const user = await this.customerRepo.findOne({ where: { id: params.Id } });
    if (!user) throw new CustomNotFoundException('User  not found');
    await this.customerRepo.delete(params.Id);
    // await this.customerRepo.delete(1, false); // for hard delete
  }

  async setActiveStatus(
    params: IdParamDto,
    isActive: boolean,
  ): Promise<CustomerResponseDTO> {
    const user = await this.customerRepo.findOne({ where: { id: params.Id } });
    if (!user) throw new CustomNotFoundException('User  not found');
    user.isActive = isActive;
    const saved = await this.customerRepo.update(params.Id, user);
    return this.mapper.map(saved, CustomerEntity, CustomerResponseDTO);
  }

  async getActiveCustomers(pagination: PaginationRequestDto) {
    const role = await this.roleRepo.findOne({ where: { id: 3 } });
    return this.getUsersByStatusAndRole(true, role, pagination);
  }

  async getDeactiveCustomers(pagination: PaginationRequestDto) {
    const role = await this.roleRepo.findOne({ where: { id: 3 } });
    return this.getUsersByStatusAndRole(false, role, pagination);
  }

  async searchByName(term: string): Promise<CustomerResponseDTO[]> {
    const found = await this.customerRepo.queryBuilder(
      'SELECT * FROM customer_entity WHERE name ILIKE $1 or email ILIKE $1',
      [`%${term}%`],
    );
    const mainList = this.mapper.mapArray(
      found,
      CustomerEntity,
      CustomerMainDTO,
    );
    return this.mapper.mapArray(mainList, CustomerMainDTO, CustomerResponseDTO);
  }

  async updatePassword(email: string, password: string): Promise<CustomerResponseDTO> {
    const user = await this.customerRepo.findOne({ where: { email } });
    if (!user) throw new CustomNotFoundException('User not found');

    user.password = await bcrypt.hash(password, 10);
    await this.customerRepo.update(user.id, { password: user.password });

    return this.mapper.map(user, CustomerEntity, CustomerResponseDTO);
  }

  async updateEmail(
    params: IdParamDto,
    email: string,
  ): Promise<CustomerResponseDTO> {
    const user = await this.customerRepo.findOne({ where: { id: params.Id } });
    if (!user) throw new CustomNotFoundException('User  not found');
    user.email = email;
    const saved = await this.customerRepo.update(params.Id, user);
    return this.mapper.map(saved, CustomerEntity, CustomerResponseDTO);
  }

  // ****************************************************
  // Private Functions and (Helper Function)
  // ****************************************************

  private async getUsersByStatusAndRole(
    isActive: boolean,
    role: RolesEntity,
    pagination: PaginationRequestDto,
  ): Promise<{
    users: CustomerResponseDTO[];
    totalRecords: number;
    totalPages: number;
  }> {
    const data = await this.customerRepo.dataAndPagination(
      isActive,
      role,
      pagination.page,
      pagination.limit,
    );
    return {
      users: data.users,
      totalRecords: data.count,
      totalPages: data.totalPages,
    };
  }

  async findByEmail(email: string): Promise<CustomerEntity | null> {
    return await this.customerRepo.findOne({
      where: { email },
      relations: ['address'],
    });
  }

  async findById(id: number) {
    return await this.customerRepo.findOne({ where: { id } });
  }

  async updateUserAddress(
    params: IdParamDto,
    dto: PatchAddressDTO,
  ): Promise<CustomerResponseDTO> {
    const user = await this.customerRepo.findOne({
      where: { id: params.Id },
      relations: ['address'],
    });
    if (!user) throw new CustomNotFoundException('User  not found');
    if (!user.address)
      throw new CustomNotFoundException('User has no address associated');
    await this.addressService.updateAddress(user.address.id, dto);
    const refreshedUser = await this.customerRepo.findOne({
      where: { id: user.id },
      relations: ['address'],
    });
    const main = this.mapper.map(
      refreshedUser,
      CustomerEntity,
      CustomerMainDTO,
    );
    return this.mapper.map(main, CustomerMainDTO, CustomerResponseDTO);
  }

  private generateRandomPassword(length = 8): string {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const digit = '0123456789';
    const special = '@#';
    const all = upper + lower + digit + special;

    if (length < 4) {
      throw new Error('Password length must be at least 4 characters');
    }

    const password = [
      upper[Math.floor(Math.random() * upper.length)],
      lower[Math.floor(Math.random() * lower.length)],
      digit[Math.floor(Math.random() * digit.length)],
      special[Math.floor(Math.random() * special.length)],
    ];

    while (password.length < length) {
      password.push(all[Math.floor(Math.random() * all.length)]);
    }

    for (let i = password.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [password[i], password[j]] = [password[j], password[i]];
    }

    return password.join('');
  }

}

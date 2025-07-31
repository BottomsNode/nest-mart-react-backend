import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseRepository, Pagination_Length } from 'src/common';
import { CustomerEntity } from '../entities/user.entity';
import { CustomerResponseDTO } from '../dto/response-customer.dto';
import { CreateCustomerDTO } from '../dto/create-customer.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { RolesEntity } from 'src/modules/auth/entities/role.entity';

@Injectable()
export class UserRepository extends BaseRepository<CustomerEntity> {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly userRepo: Repository<CustomerEntity>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {
    super(userRepo);
  }

  async findByEmail(email: string): Promise<CustomerEntity | null> {
    return await this.userRepo.findOne({
      where: { email },
      relations: ['address'],
    });
  }

  // async createUser(
  //   dto: CreateCustomerDTO,
  //   role: RolesEntity,
  // ): Promise<CustomerResponseDTO> {
  //   const hashedPassword = await bcrypt.hash(dto.password, 10);
  //   const entity = this.userRepo.create(dto);
  //   entity.password = hashedPassword;
  //   entity.role = role;
  //   const savedEntity = await this.create(entity);
  //   return this.mapper.map(savedEntity, CustomerEntity, CustomerResponseDTO);
  // }
  async createUser(
    dto: CreateCustomerDTO,
    role: RolesEntity,
  ): Promise<CustomerEntity> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const entity = this.userRepo.create(dto);
    entity.password = hashedPassword;
    entity.role = role;
    return await this.create(entity);
  }

  async queryBuilder(
    query: string,
    params: any[] = [],
  ): Promise<CustomerEntity[]> {
    return await this.userRepo.query(query, params);
  }

  async dataAndPagination(
    isActive: boolean = true,
    roleName: RolesEntity,
    page: number = Pagination_Length.START,
    limit: number = Pagination_Length.VERY_SMALL,
  ): Promise<{
    users: CustomerResponseDTO[];
    count: number;
    totalPages: number;
  }> {
    const queryBuilder = this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.address', 'address')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.isActive = :isActive', { isActive })
      .andWhere('role.name = :roleName', { roleName })
      .take(limit)
      .skip((page - 1) * limit);

    const [users, count] = await queryBuilder.getManyAndCount();

    const mappedUsers = this.mapper.mapArray(
      users,
      CustomerEntity,
      CustomerResponseDTO,
    );
    const totalPages = Math.ceil(count / limit);

    return { users: mappedUsers, count, totalPages };
  }
}

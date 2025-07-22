import { Mapper } from '@automapper/core';
import { CustomerEntity } from './entities/user.entity';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';
import { CustomerResponseDTO } from './dto/response-customer.dto';
import { IdParamDto, PaginationRequestDto } from 'src/common';
import { AddressService } from '../address/address.service';
import { PatchAddressDTO } from '../address/dto/patch/patch-address.dto';
import { UserRepository } from './repository/user.repository';
import { RolesRepository } from '../auth/repository/roles.repository';
export declare class UserService {
    private readonly customerRepo;
    private readonly roleRepo;
    private readonly addressService;
    private readonly mapper;
    constructor(customerRepo: UserRepository, roleRepo: RolesRepository, addressService: AddressService, mapper: Mapper);
    create(dto: CreateCustomerDTO): Promise<CustomerResponseDTO>;
    getAllUsers(): Promise<CustomerResponseDTO[]>;
    getUser(params: IdParamDto): Promise<CustomerResponseDTO>;
    updateUser(params: IdParamDto, dto: UpdateCustomerDTO): Promise<CustomerResponseDTO>;
    deleteUser(params: IdParamDto): Promise<void>;
    setActiveStatus(params: IdParamDto, isActive: boolean): Promise<CustomerResponseDTO>;
    getActiveCustomers(pagination: PaginationRequestDto): Promise<{
        users: CustomerResponseDTO[];
        totalRecords: number;
        totalPages: number;
    }>;
    getDeactiveCustomers(pagination: PaginationRequestDto): Promise<{
        users: CustomerResponseDTO[];
        totalRecords: number;
        totalPages: number;
    }>;
    searchByName(term: string): Promise<CustomerResponseDTO[]>;
    updatePassword(email: string, password: string): Promise<CustomerResponseDTO>;
    updateEmail(params: IdParamDto, email: string): Promise<CustomerResponseDTO>;
    private getUsersByStatusAndRole;
    findByEmail(email: string): Promise<CustomerEntity | null>;
    updateUserAddress(params: IdParamDto, dto: PatchAddressDTO): Promise<CustomerResponseDTO>;
}

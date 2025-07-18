import { Repository } from 'typeorm';
import { BaseRepository } from 'src/common';
import { CustomerEntity } from '../entities/user.entity';
import { CustomerResponseDTO } from '../dto/response-customer.dto';
import { CreateCustomerDTO } from '../dto/create-customer.dto';
import { Mapper } from '@automapper/core';
import { RolesEntity } from 'src/modules/auth/entities/role.entity';
export declare class UserRepository extends BaseRepository<CustomerEntity> {
    private readonly userRepo;
    private readonly mapper;
    constructor(userRepo: Repository<CustomerEntity>, mapper: Mapper);
    findByEmail(email: string): Promise<CustomerEntity | null>;
    createUser(dto: CreateCustomerDTO, role: RolesEntity): Promise<CustomerResponseDTO>;
    queryBuilder(query: string, params?: any[]): Promise<CustomerEntity[]>;
    dataAndPagination(isActive: boolean, roleName: RolesEntity, page?: number, limit?: number): Promise<{
        users: CustomerResponseDTO[];
        count: number;
        totalPages: number;
    }>;
}

import { Repository } from 'typeorm';
import { BaseRepository } from 'src/common';
import { Mapper } from '@automapper/core';
import { RolesEntity } from '../entities/role.entity';
export declare class RolesRepository extends BaseRepository<RolesEntity> {
    private readonly rolesRepo;
    private readonly mapper;
    constructor(rolesRepo: Repository<RolesEntity>, mapper: Mapper);
    queryBuilder(query: string, params?: any): Promise<RolesEntity[]>;
}

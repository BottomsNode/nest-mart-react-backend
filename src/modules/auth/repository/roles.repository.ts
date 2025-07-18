import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { RolesEntity } from '../entities/role.entity';

@Injectable()
export class RolesRepository extends BaseRepository<RolesEntity> {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly rolesRepo: Repository<RolesEntity>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {
    super(rolesRepo);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  queryBuilder(query: string, params?: any): Promise<RolesEntity[]> {
    throw new Error('Method not implemented.');
  }
}

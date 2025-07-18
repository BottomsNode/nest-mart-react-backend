import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { SaleItemEntity } from '../entities/items/sale-item.entity';

@Injectable()
export class SalesItemRepository extends BaseRepository<SaleItemEntity> {
  constructor(
    @InjectRepository(SaleItemEntity)
    private readonly salesItemRepo: Repository<SaleItemEntity>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {
    super(salesItemRepo);
  }

  async queryBuilder(
    query: string,
    params: any[] = [],
  ): Promise<SaleItemEntity[]> {
    return await this.salesItemRepo.query(query, params);
  }
}

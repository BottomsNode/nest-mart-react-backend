import { Repository } from 'typeorm';
import { BaseRepository } from 'src/common';
import { Mapper } from '@automapper/core';
import { SaleItemEntity } from '../entities/items/sale-item.entity';
export declare class SalesItemRepository extends BaseRepository<SaleItemEntity> {
    private readonly salesItemRepo;
    private readonly mapper;
    constructor(salesItemRepo: Repository<SaleItemEntity>, mapper: Mapper);
    queryBuilder(query: string, params?: any[]): Promise<SaleItemEntity[]>;
}

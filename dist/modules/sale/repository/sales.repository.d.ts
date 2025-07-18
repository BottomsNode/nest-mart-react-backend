import { Repository } from 'typeorm';
import { SaleEntity } from '../entities/sales/sales.entity';
import { BaseRepository } from 'src/common';
import { Mapper } from '@automapper/core';
export declare class SalesRepository extends BaseRepository<SaleEntity> {
    private readonly salesRepo;
    private readonly mapper;
    constructor(salesRepo: Repository<SaleEntity>, mapper: Mapper);
    queryBuilder(query: string, params?: any[]): Promise<SaleEntity[]>;
    getAllSalesWithDetails(): Promise<SaleEntity[]>;
}

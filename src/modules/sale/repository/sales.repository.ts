import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleEntity } from '../entities/sales/sales.entity';
import { BaseRepository } from 'src/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class SalesRepository extends BaseRepository<SaleEntity> {
  constructor(
    @InjectRepository(SaleEntity)
    private readonly salesRepo: Repository<SaleEntity>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {
    super(salesRepo);
  }

  async queryBuilder(query: string, params: any[] = []): Promise<SaleEntity[]> {
    return await this.salesRepo.query(query, params);
  }

  async getAllSalesWithDetails(): Promise<SaleEntity[]> {
    return await this.salesRepo
      .createQueryBuilder('sale')
      .leftJoinAndSelect('sale.customer', 'customer')
      .leftJoinAndSelect('sale.items', 'saleItem')
      .leftJoinAndSelect('saleItem.product', 'product')
      .orderBy('sale.createdAt', 'DESC')
      .getMany();
  }
}

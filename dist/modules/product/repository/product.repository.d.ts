import { ProductEntity } from '../entities/product.entity';
import { Mapper } from '@automapper/core';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/common';
import { ProductResponseDTO } from '../dto/response-product.dto';
export declare class ProductRepository extends BaseRepository<ProductEntity> {
    private readonly productRepo;
    private readonly mapper;
    constructor(productRepo: Repository<ProductEntity>, mapper: Mapper);
    findByProductName(name: string): Promise<ProductEntity | null>;
    createProduct(dto: ProductResponseDTO): Promise<ProductResponseDTO>;
    listProducts(page?: number, limit?: number, flag?: boolean): Promise<{
        products: ProductResponseDTO[];
        count: number;
        totalPages: number;
    }>;
    queryBuilder(query: string, params?: any[]): Promise<ProductEntity[]>;
}

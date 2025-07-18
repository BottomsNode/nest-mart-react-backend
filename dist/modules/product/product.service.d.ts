import { Mapper } from '@automapper/core';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductMainDTO } from './dto/main-product.dto';
import { ProductResponseDTO } from './dto/response-product.dto';
import { IdParamDto, PaginationRequestDto, PRODUCT_STATUS, StockDTO } from 'src/common';
import { ProductRepository } from './repository/product.repository';
export declare class ProductService {
    private readonly productRepo;
    private readonly mapper;
    constructor(productRepo: ProductRepository, mapper: Mapper);
    create(dto: CreateProductDTO): Promise<ProductResponseDTO>;
    getAll(pagination: PaginationRequestDto): Promise<{
        products: ProductMainDTO[];
        totalRecords: number;
        totalPages: number;
    }>;
    getOne(params: IdParamDto): Promise<ProductResponseDTO>;
    update(params: IdParamDto, dto: UpdateProductDTO): Promise<ProductResponseDTO>;
    delete(params: IdParamDto): Promise<void>;
    getActiveProducts(pagination: PaginationRequestDto): Promise<{
        products: ProductResponseDTO[];
        totalRecords: number;
        totalPages: number;
    }>;
    getDeactiveProducts(pagination: PaginationRequestDto): Promise<{
        products: ProductResponseDTO[];
        totalRecords: number;
        totalPages: number;
    }>;
    setStatus(params: IdParamDto, status: PRODUCT_STATUS): Promise<ProductResponseDTO>;
    searchByName(term: string): Promise<ProductResponseDTO[]>;
    updateStock(params: IdParamDto, stock: StockDTO): Promise<ProductResponseDTO>;
}

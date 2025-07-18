import { Injectable, Inject } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

import { ProductEntity } from './entities/product.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductMainDTO } from './dto/main-product.dto';
import { ProductResponseDTO } from './dto/response-product.dto';
import {
  CustomConflictException,
  CustomNotFoundException,
  IdParamDto,
  PaginationRequestDto,
  PRODUCT_STATUS,
  StockDTO,
} from 'src/common';
import { ProductRepository } from './repository/product.repository';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) { }

  async create(dto: CreateProductDTO): Promise<ProductResponseDTO> {
    const exists = await this.productRepo.findByProductName(dto.name);
    if (exists)
      throw new CustomConflictException(
        `Product with name '${dto.name}' already exists`,
      );
    const main = this.mapper.map(dto, CreateProductDTO, ProductMainDTO);
    const entity = this.mapper.map(main, ProductMainDTO, ProductEntity);
    const saved = await this.productRepo.createProduct(entity);
    const mainDto = this.mapper.map(saved, ProductEntity, ProductMainDTO);
    return this.mapper.map(mainDto, ProductMainDTO, ProductResponseDTO);
  }

  async getAll(pagination: PaginationRequestDto) {
    // const all = await this.productRepo.find();
    const data = await this.productRepo.listProducts(
      pagination.page,
      pagination.limit,
    );
    if (!data.products || data.products.length === 0)
      throw new CustomNotFoundException(`Product not found`);
    const mappedProducts = this.mapper.mapArray(
      data.products,
      ProductEntity,
      ProductMainDTO,
    );

    return {
      products: mappedProducts,
      totalRecords: data.count,
      totalPages: data.totalPages,
    };
  }

  async getOne(params: IdParamDto): Promise<ProductResponseDTO> {
    const found = await this.productRepo.findOne({ where: { id: params.Id } });
    if (!found)
      throw new CustomNotFoundException(
        `Product with ID ${params.Id} not found`,
      );
    const main = this.mapper.map(found, ProductEntity, ProductMainDTO);
    return this.mapper.map(main, ProductMainDTO, ProductResponseDTO);
  }

  async update(
    params: IdParamDto,
    dto: UpdateProductDTO,
  ): Promise<ProductResponseDTO> {
    const entity = await this.productRepo.findOne({ where: { id: params.Id } });
    if (!entity)
      throw new CustomNotFoundException(
        `Product with ID ${params.Id} not found`,
      );
    Object.assign(entity, dto);
    const saved = await this.productRepo.update(params.Id, entity);
    const main = this.mapper.map(saved, ProductEntity, ProductMainDTO);
    return this.mapper.map(main, ProductMainDTO, ProductResponseDTO);
  }

  async delete(params: IdParamDto): Promise<void> {
    const entity = await this.productRepo.findOne({ where: { id: params.Id } });
    if (!entity)
      throw new CustomNotFoundException(
        `Product with ID ${params.Id} not found`,
      );
    await this.productRepo.delete(params.Id);
  }

  async getActiveProducts(pagination: PaginationRequestDto): Promise<{
    products: ProductResponseDTO[];
    totalRecords: number;
    totalPages: number;
  }> {
    const data = await this.productRepo.listProducts(
      pagination.page,
      pagination.limit,
    );
    const mappedProducts = this.mapper.mapArray(
      data.products,
      ProductEntity,
      ProductResponseDTO,
    );
    return {
      products: mappedProducts,
      totalRecords: data.count,
      totalPages: data.totalPages,
    };
  }

  async getDeactiveProducts(pagination: PaginationRequestDto): Promise<{
    products: ProductResponseDTO[];
    totalRecords: number;
    totalPages: number;
  }> {
    const data = await this.productRepo.listProducts(
      pagination.page,
      pagination.limit,
      false,
    );
    const mappedProducts = this.mapper.mapArray(
      data.products,
      ProductEntity,
      ProductResponseDTO,
    );
    return {
      products: mappedProducts,
      totalRecords: data.count,
      totalPages: data.totalPages,
    };
  }

  async setStatus(params: IdParamDto, status: PRODUCT_STATUS): Promise<ProductResponseDTO> {
    const product = await this.productRepo.findOne({
      where: { id: params.Id },
    });

    if (!product) throw new CustomNotFoundException('Product not found');

    product.status = status;
    console.log("-------------------------------",status)
    console.log(product.status)

    const saved = await this.productRepo.update(params.Id,product);

    const main = this.mapper.map(saved, ProductEntity, ProductMainDTO);
    return this.mapper.map(main, ProductMainDTO, ProductResponseDTO);
  }


  async searchByName(term: string): Promise<ProductResponseDTO[]> {
    const found = await this.productRepo.queryBuilder(
      'SELECT * FROM product_entity WHERE name ILIKE $1',
      [`%${term}%`],
    );
    const mainList = this.mapper.mapArray(found, ProductEntity, ProductMainDTO);
    return this.mapper.mapArray(mainList, ProductMainDTO, ProductResponseDTO);
  }

  async updateStock(
    params: IdParamDto,
    stock: StockDTO,
  ): Promise<ProductResponseDTO> {
    const product = await this.productRepo.findOne({
      where: { id: params.Id },
    });
    if (!product) throw new CustomNotFoundException('Product not found');
    product.stock = stock.stock
    const saved = await this.productRepo.update(params.Id, product);
    const main = this.mapper.map(saved, ProductEntity, ProductMainDTO);
    return this.mapper.map(main, ProductMainDTO, ProductResponseDTO);
  }
}

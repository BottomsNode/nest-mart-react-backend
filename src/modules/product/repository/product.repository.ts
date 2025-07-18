import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Repository } from 'typeorm';
import { BaseRepository, Pagination_Length, PRODUCT_STATUS } from 'src/common';
import { ProductResponseDTO } from '../dto/response-product.dto';

@Injectable()
export class ProductRepository extends BaseRepository<ProductEntity> {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {
    super(productRepo);
  }

  async findByProductName(name: string): Promise<ProductEntity | null> {
    return await this.productRepo.findOne({
      where: { name },
    });
  }

  async createProduct(dto: ProductResponseDTO): Promise<ProductResponseDTO> {
    const existingCustomer = await this.findOne({ where: { name: dto.name } });
    if (existingCustomer) {
      throw new HttpException(
        'Product with this name already exists',
        HttpStatus.CONFLICT,
      );
    }
    const entity = this.productRepo.create(dto);
    const savedEntity = await this.create(entity);
    return this.mapper.map(savedEntity, ProductEntity, ProductResponseDTO);
  }

  async listProducts(
    page: number = Pagination_Length.START,
    limit: number = Pagination_Length.VERY_SMALL,
    flag: boolean = true,
  ): Promise<{
    products: ProductResponseDTO[];
    count: number;
    totalPages: number;
  }> {
    const [products, count] = await this.productRepo.findAndCount({
      // where: {
      //   status: Number(
      //     flag === true ? PRODUCT_STATUS.ACTIVE : PRODUCT_STATUS.INACTIVE,
      //   ),
      // },
      take: limit,
      skip: (page - 1) * limit,
    });

    const product_mapped = this.mapper.mapArray(
      products,
      ProductEntity,
      ProductResponseDTO,
    );
    const totalPages = Math.ceil(count / limit);
    return { products: product_mapped, count, totalPages };
  }

  async queryBuilder(
    query: string,
    params: any[] = [],
  ): Promise<ProductEntity[]> {
    return await this.productRepo.query(query, params);
  }
}

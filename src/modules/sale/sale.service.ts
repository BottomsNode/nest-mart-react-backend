import { Inject, Injectable } from '@nestjs/common';
import { SalesRepository } from './repository/sales.repository';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { SaleResponseDTO } from './dto/sales/response-sales.dto';
import { SaleDTO } from './dto/sales/main-sales.dto';
import { SaleEntity } from './entities/sales/sales.entity';
import { CreateSaleDTO } from './dto/sales/create-sales.dto';
import { CustomNotFoundException, IdParamDto } from 'src/common';
import { UpdateSaleDTO } from './dto/sales/update-sales.dto';
import { SaleItemEntity } from './entities/items/sale-item.entity';
import { CustomerEntity } from '../user/entities/user.entity';
import { ProductRepository } from '../product/repository/product.repository';
import { CreateSaleItemDTO } from './dto/items/create-salesItem.dto';
import { UserRepository } from '../user/repository/user.repository';

@Injectable()
export class SaleService {
  constructor(
    @Inject('SalesRepository') private readonly salesRepo: SalesRepository,
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepository,
    @Inject('UserRepository') private readonly userRepo: UserRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(dto: CreateSaleDTO): Promise<SaleResponseDTO> {
    const totalAmount = dto.items.reduce(
      (sum, item) => sum + item.quantity * item.priceAtPurchase,
      0,
    );

    const saleEntity = new SaleEntity();
    saleEntity.totalAmount = totalAmount;
    saleEntity.customer = { id: dto.customerId } as CustomerEntity;

    const saleItemEntities: SaleItemEntity[] = [];
    for (const item of dto.items) {
      const product = await this.productRepo.findOne({
        where: { id: item.id },
      });
      if (!product)
        throw new CustomNotFoundException(
          `Product with ID ${item.id} not found in stock.`,
        );
      if (product.stock < item.quantity)
        throw new CustomNotFoundException(
          `Insufficient stock for product ID ${item.id}. Available: ${product.stock}, Requested: ${item.quantity}`,
        );
      product.stock -= item.quantity;
      await this.productRepo.update(item.id, product);
      const saleItemEntity = this.mapper.map(
        item,
        CreateSaleItemDTO,
        SaleItemEntity,
      );
      saleItemEntity.product = product;
      saleItemEntities.push(saleItemEntity);
    }

    saleEntity.items = saleItemEntities;
    const savedSale = await this.salesRepo.create(saleEntity);
    return this.mapper.map(savedSale, SaleEntity, SaleResponseDTO);
  }

  async getAllSales(): Promise<SaleDTO[]> {
    const sales = await this.salesRepo.getAllSalesWithDetails();
    if (!sales || sales.length === 0)
      throw new CustomNotFoundException('No Sales Yet..!');
    const mainList = this.mapper.mapArray(sales, SaleEntity, SaleDTO);
    return mainList;
  }

  /*async getSaleById(params: IdParamDto): Promise<SaleResponseDTO> {
    const sale = await this.salesRepo.findOne({
      where: { id: params.Id },
      relations: ['customer', 'items'],
    });
    if (!sale)
      throw new CustomNotFoundException(`Sale with ID ${params.Id} not found`);
    const main = this.mapper.map(sale, SaleEntity, SaleDTO);
    return this.mapper.map(main, SaleDTO, SaleResponseDTO);
  }*/
  async getSalesByCustomerEmail(email: string): Promise<SaleResponseDTO[]> {
    const customer = await this.userRepo.findByEmail(email);

    if (!customer) {
      throw new CustomNotFoundException(
        `Customer with email ${email} not found`,
      );
    }

    const sales = await this.salesRepo.find({
      where: { customer: { id: customer.id } },
      relations: ['customer', 'items'],
    });

    if (!sales || sales.length === 0) {
      throw new CustomNotFoundException(
        `No sales found for customer with email ${email}`,
      );
    }

    return sales.map((sale) => {
      const main = this.mapper.map(sale, SaleEntity, SaleDTO);
      return this.mapper.map(main, SaleDTO, SaleResponseDTO);
    });
  }

  async updateSale(
    params: { Id: number },
    dto: UpdateSaleDTO,
  ): Promise<SaleResponseDTO> {
    const sale = await this.salesRepo.findOne({ where: { id: params.Id } });
    if (!sale) {
      throw new CustomNotFoundException(`Sale with ID ${params.Id} not found`);
    }
    Object.assign(sale, dto);
    const saved = await this.salesRepo.update(params.Id, sale);
    const main = this.mapper.map(saved, SaleEntity, SaleDTO);
    return this.mapper.map(main, SaleDTO, SaleResponseDTO);
  }

  async deleteSale(params: IdParamDto): Promise<void> {
    const sales = await this.salesRepo.findOne({ where: { id: params.Id } });
    if (!sales)
      throw new CustomNotFoundException(
        `Product with ID ${params.Id} not found`,
      );
    await this.salesRepo.delete(params.Id);
  }
}

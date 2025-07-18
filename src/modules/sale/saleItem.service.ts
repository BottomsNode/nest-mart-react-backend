import { Inject, Injectable } from '@nestjs/common';
import { CustomNotFoundException, IdParamDto } from 'src/common';
import { SaleItemResponseDTO } from './dto/items/response-salesItem.dto';
import { UpdateSaleItemDTO } from './dto/items/update-salesItem.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { SaleItemDTO } from './dto/items/main-salesItem.dto';
import { SalesItemRepository } from './repository/salesItem.repository';

@Injectable()
export class SaleItemService {
  constructor(
    @Inject('SalesItemRepository')
    private readonly salesItemRepo: SalesItemRepository,

    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getAllSaleItems(): Promise<SaleItemResponseDTO[]> {
    const saleItems = await this.salesItemRepo.find({ relations: ['product'] });
    if (!saleItems || saleItems.length === 0)
      throw new CustomNotFoundException(`No Sale Items Yet..!`);
    const sales_map = this.mapper.mapArray(
      saleItems,
      SaleItemDTO,
      SaleItemResponseDTO,
    );
    return sales_map;
  }

  async getSaleItemById(params: IdParamDto): Promise<SaleItemResponseDTO> {
    const saleItem = await this.salesItemRepo.findOne({
      where: { id: params.Id },
      relations: ['product'],
    });
    if (!saleItem)
      throw new CustomNotFoundException(
        `Sale Item with ID ${params.Id} not found`,
      );
    const sales_map = this.mapper.map(
      saleItem,
      SaleItemDTO,
      SaleItemResponseDTO,
    );
    return sales_map;
  }

  async updateSaleItem(
    params: IdParamDto,
    dto: UpdateSaleItemDTO,
  ): Promise<SaleItemResponseDTO> {
    const saleItem = await this.salesItemRepo.findOne({
      where: { id: params.Id },
      relations: ['product'],
    });
    if (!saleItem)
      throw new CustomNotFoundException(
        `Sale Item with ID ${params.Id} not found`,
      );
    Object.assign(saleItem, dto);
    const updated = await this.salesItemRepo.update(params.Id, saleItem);
    return updated;
  }

  async deleteSaleItem(params: IdParamDto): Promise<void> {
    const saleItem = await this.salesItemRepo.findOne({
      where: { id: params.Id },
    });
    if (!saleItem)
      throw new CustomNotFoundException(
        `Sale Item with ID ${params.Id} not found`,
      );
    await this.salesItemRepo.delete(params.Id);
  }
}

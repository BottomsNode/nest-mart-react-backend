import { IdParamDto } from 'src/common';
import { SaleItemResponseDTO } from './dto/items/response-salesItem.dto';
import { UpdateSaleItemDTO } from './dto/items/update-salesItem.dto';
import { Mapper } from '@automapper/core';
import { SalesItemRepository } from './repository/salesItem.repository';
export declare class SaleItemService {
    private readonly salesItemRepo;
    private readonly mapper;
    constructor(salesItemRepo: SalesItemRepository, mapper: Mapper);
    getAllSaleItems(): Promise<SaleItemResponseDTO[]>;
    getSaleItemById(params: IdParamDto): Promise<SaleItemResponseDTO>;
    updateSaleItem(params: IdParamDto, dto: UpdateSaleItemDTO): Promise<SaleItemResponseDTO>;
    deleteSaleItem(params: IdParamDto): Promise<void>;
}

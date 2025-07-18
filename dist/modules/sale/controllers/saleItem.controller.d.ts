import { IdParamDto } from 'src/common';
import { SaleItemResponseDTO } from '../dto/items/response-salesItem.dto';
import { UpdateSaleItemDTO } from '../dto/items/update-salesItem.dto';
import { SaleItemService } from '../saleItem.service';
export declare class SaleItemController {
    private readonly saleItemService;
    constructor(saleItemService: SaleItemService);
    getAll(): Promise<SaleItemResponseDTO[]>;
    getOne(params: IdParamDto): Promise<SaleItemResponseDTO>;
    update(params: IdParamDto, dto: UpdateSaleItemDTO): Promise<SaleItemResponseDTO>;
    delete(params: IdParamDto): Promise<void>;
}

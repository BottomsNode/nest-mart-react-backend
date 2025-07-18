import { SaleService } from '../sale.service';
import { IdParamDto } from 'src/common';
import { SaleResponseDTO } from '../dto/sales/response-sales.dto';
import { CreateSaleDTO } from '../dto/sales/create-sales.dto';
import { UpdateSaleDTO } from '../dto/sales/update-sales.dto';
export declare class SaleController {
    private readonly saleService;
    constructor(saleService: SaleService);
    create(dto: CreateSaleDTO): Promise<SaleResponseDTO>;
    getAll(): Promise<import("../dto/sales/main-sales.dto").SaleDTO[]>;
    getSalesByCustomerEmail(email: string): Promise<SaleResponseDTO[]>;
    update(params: IdParamDto, dto: UpdateSaleDTO): Promise<SaleResponseDTO>;
    delete(params: IdParamDto): Promise<void>;
}

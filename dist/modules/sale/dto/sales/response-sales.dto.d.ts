import { CustomerResponseDTO } from 'src/modules/user/dto/response-customer.dto';
import { ResponseCommonDto } from 'src/common';
import { SaleItemDTO } from '../items/main-salesItem.dto';
export declare class SaleResponseDTO extends ResponseCommonDto {
    customer: CustomerResponseDTO;
    deletedAt?: Date;
    saleDate?: Date;
    totalAmount: number;
    customerId: number;
    items: SaleItemDTO[];
}

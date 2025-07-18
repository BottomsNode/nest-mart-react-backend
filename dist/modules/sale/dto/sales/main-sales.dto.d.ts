import { CustomerResponseDTO } from 'src/modules/user/dto/response-customer.dto';
import { SaleItemDTO } from '../items/main-salesItem.dto';
export declare class SaleDTO {
    id: number;
    saleDate?: Date;
    totalAmount: number;
    customer: CustomerResponseDTO;
    items: SaleItemDTO[];
}

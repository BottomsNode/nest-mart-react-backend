import { CreateSaleItemDTO } from '../items/create-salesItem.dto';
export declare class CreateSaleDTO {
    totalAmount: number;
    customerId: number;
    items: CreateSaleItemDTO[];
}

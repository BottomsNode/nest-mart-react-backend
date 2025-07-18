import { PRODUCT_STATUS, ResponseCommonDto } from 'src/common';
export declare class ProductResponseDTO extends ResponseCommonDto {
    name: string;
    price: number;
    stock: number;
    status: PRODUCT_STATUS;
}

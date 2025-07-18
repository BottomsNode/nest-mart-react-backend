import { PRODUCT_STATUS } from 'src/common';
export declare class ProductMainDTO {
    id: number;
    name: string;
    createdAt: Date;
    price: number;
    stock: number;
    status: PRODUCT_STATUS;
}

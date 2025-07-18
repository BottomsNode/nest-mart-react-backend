import { ProductMainDTO } from 'src/modules/product/dto/main-product.dto';
export declare class SaleItemDTO {
    id: number;
    quantity: number;
    priceAtPurchase: number;
    product: ProductMainDTO;
}

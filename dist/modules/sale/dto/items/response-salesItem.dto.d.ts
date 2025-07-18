import { ProductResponseDTO } from 'src/modules/product/dto/response-product.dto';
import { ResponseCommonDto } from 'src/common';
export declare class SaleItemResponseDTO extends ResponseCommonDto {
    product: ProductResponseDTO;
    quantity: number;
    priceAtPurchase: number;
}

import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { MyBaseEntity } from 'src/common';
import { SaleEntity } from '../sales/sales.entity';
export declare class SaleItemEntity extends MyBaseEntity {
    sale: SaleEntity;
    product: ProductEntity;
    quantity: number;
    priceAtPurchase: number;
}

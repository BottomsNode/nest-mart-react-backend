import { MyBaseEntity } from 'src/common';
import { PRODUCT_STATUS } from 'src/common/constants';
import { SaleItemEntity } from 'src/modules/sale/entities/items/sale-item.entity';
export declare class ProductEntity extends MyBaseEntity {
    name: string;
    price: number;
    stock: number;
    status: PRODUCT_STATUS;
    saleItems: SaleItemEntity[];
}

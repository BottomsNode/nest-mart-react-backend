import { MyBaseEntity } from '../../../../common';
import { CustomerEntity } from '../../../user/entities/user.entity';
import { SaleItemEntity } from '../items/sale-item.entity';
export declare class SaleEntity extends MyBaseEntity {
    saleDate: Date;
    totalAmount: number;
    customer: CustomerEntity;
    items: SaleItemEntity[];
}

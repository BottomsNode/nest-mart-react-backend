import { MyBaseEntity } from '../../../common';
import { AddressEntity } from '../../address/entities/address.entity';
import { RolesEntity } from '../../auth/entities/role.entity';
import { SaleEntity } from '../../sale/entities/sales/sales.entity';
export declare class CustomerEntity extends MyBaseEntity {
    name: string;
    phone: string;
    email: string;
    password: string;
    isActive: boolean;
    role: RolesEntity;
    address?: AddressEntity | null;
    sales: SaleEntity[];
}

import { AddressMainDTO } from 'src/modules/address/dto/main-address.dto';
import { SaleDTO } from 'src/modules/sale/dto/sales/main-sales.dto';
import { RolesEntity } from 'src/modules/auth/entities/role.entity';
export declare class CustomerMainDTO {
    id: number;
    name: string;
    phone: string;
    createdAt: string;
    email: string;
    password: string;
    isActive: boolean;
    role: RolesEntity;
    address: AddressMainDTO;
    sales?: SaleDTO[];
}

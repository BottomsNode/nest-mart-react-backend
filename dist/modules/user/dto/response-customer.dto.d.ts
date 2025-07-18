import { ResponseCommonDto } from 'src/common';
import { AddressMainDTO } from 'src/modules/address/dto/main-address.dto';
import { RolesEntity } from 'src/modules/auth/entities/role.entity';
import { SaleDTO } from 'src/modules/sale/dto/sales/main-sales.dto';
export declare class CustomerResponseDTO extends ResponseCommonDto {
    name: string;
    phone: string;
    email: string;
    isActive: boolean;
    role: RolesEntity;
    address: AddressMainDTO;
    sales?: SaleDTO[];
    deletedAt?: Date;
    password: string;
}

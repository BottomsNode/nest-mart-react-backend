import { CreateAddressDTO } from 'src/modules/address/dto/create-address.dto';
export declare class CreateCustomerDTO {
    name: string;
    phone: string;
    email: string;
    password: string;
    isActive?: boolean;
    roleId: string;
    address?: CreateAddressDTO;
}

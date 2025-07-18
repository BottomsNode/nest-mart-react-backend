import { MyBaseEntity } from '../../../common';
import { CustomerEntity } from '../../user/entities/user.entity';
export declare class AddressEntity extends MyBaseEntity {
    street: string;
    city: string;
    pincode: string;
    customer: CustomerEntity;
}

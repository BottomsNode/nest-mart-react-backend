import { AutoMap } from '@automapper/classes';
import { MyBaseEntity } from '../../../common';
import { CustomerEntity } from '../../user/entities/user.entity';
import { Entity, Column, OneToOne } from 'typeorm';

@Entity()
export class AddressEntity extends MyBaseEntity {
  @Column()
  @AutoMap()
  street: string;

  @Column()
  @AutoMap()
  city: string;

  @Column()
  @AutoMap()
  pincode: string;

  @AutoMap()
  @OneToOne(() => CustomerEntity, (customer) => customer.address)
  customer: CustomerEntity;
}

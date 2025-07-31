import { AutoMap } from '@automapper/classes';
import { MyBaseEntity } from '../../../common';
import { AddressEntity } from '../../address/entities/address.entity';
import { RolesEntity } from '../../auth/entities/role.entity';
import { SaleEntity } from '../../sale/entities/sales/sales.entity';
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { CustomerActivityLogEntity } from '../../logs/entities/user-activity-log.entity';

@Entity()
export class CustomerEntity extends MyBaseEntity {
  @Column()
  @AutoMap()
  name: string;

  @Column()
  @AutoMap()
  phone: string;

  @AutoMap()
  @Column({ unique: true })
  email: string;

  @Column()
  @AutoMap()
  password: string;

  @AutoMap()
  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => RolesEntity, { eager: true })
  @JoinColumn()
  role: RolesEntity;

  @AutoMap()
  @OneToOne(() => AddressEntity, (address) => address.customer, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  address?: AddressEntity | null;

  @AutoMap()
  @OneToMany(() => SaleEntity, (sale) => sale.customer)
  sales: SaleEntity[];

  @OneToMany(() => CustomerActivityLogEntity, (log) => log.customer)
  logs: CustomerActivityLogEntity[];
}

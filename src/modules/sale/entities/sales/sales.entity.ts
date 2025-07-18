import { MyBaseEntity } from '../../../../common';
import { CustomerEntity } from '../../../user/entities/user.entity';
import {
  Entity,
  CreateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { SaleItemEntity } from '../items/sale-item.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
export class SaleEntity extends MyBaseEntity {
  @CreateDateColumn()
  @AutoMap()
  saleDate: Date;

  @AutoMap()
  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @AutoMap()
  @ManyToOne(() => CustomerEntity, (customer) => customer.sales, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  customer: CustomerEntity;

  @AutoMap()
  @OneToMany(() => SaleItemEntity, (item) => item.sale, {
    cascade: true,
    eager: true,
  })
  items: SaleItemEntity[];
}

import { AutoMap } from '@automapper/classes';
import { MyBaseEntity } from 'src/common';
import { PRODUCT_STATUS } from 'src/common/constants';
import { SaleItemEntity } from 'src/modules/sale/entities/items/sale-item.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class ProductEntity extends MyBaseEntity {
  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @AutoMap()
  @Column({ default: 15 })
  stock: number;

  @AutoMap()
  @Column({
    type: 'enum',
    enumName: 'product_status_enum',
    enum: PRODUCT_STATUS,
    default: PRODUCT_STATUS.ACTIVE,
  })
  status: PRODUCT_STATUS;

  @AutoMap()
  @OneToMany(() => SaleItemEntity, (item) => item.product)
  saleItems: SaleItemEntity[];
}

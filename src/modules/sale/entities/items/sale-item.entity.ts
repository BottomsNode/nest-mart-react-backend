import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { MyBaseEntity } from 'src/common';
import { SaleEntity } from '../sales/sales.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
export class SaleItemEntity extends MyBaseEntity {
  @AutoMap()
  @ManyToOne(() => SaleEntity, (sale) => sale.items)
  sale: SaleEntity;

  @AutoMap()
  @ManyToOne(() => ProductEntity, (product) => product.saleItems)
  product: ProductEntity;

  @AutoMap()
  @Column()
  quantity: number;

  @AutoMap()
  @Column('decimal', { precision: 10, scale: 2 })
  priceAtPurchase: number;
}

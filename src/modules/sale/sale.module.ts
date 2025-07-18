import { Module } from '@nestjs/common';
import { SaleController } from './controllers/sale.controller';
import { SaleService } from './sale.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './entities/sales/sales.entity';
import { SaleItemEntity } from './entities/items/sale-item.entity';
import { SaleItemController } from './controllers/saleItem.controller';
import { SaleItemService } from './saleItem.service';
import { SalesRepository } from './repository/sales.repository';
import { SalesItemRepository } from './repository/salesItem.repository';
import { ProductRepository } from '../product/repository/product.repository';
import { ProductModule } from '../product/product.module';
import { ProductEntity } from '../product/entities/product.entity';
import { UserRepository } from '../user/repository/user.repository';
import { CustomerEntity } from '../user/entities/user.entity';

@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forFeature([SaleEntity, SaleItemEntity, ProductEntity, CustomerEntity]),
  ],
  controllers: [SaleController, SaleItemController],
  providers: [
    SaleService,
    SaleItemService,
    {
      provide: 'SalesRepository',
      useClass: SalesRepository,
    },
    {
      provide: 'SalesItemRepository',
      useClass: SalesItemRepository,
    },
    {
      provide: 'ProductRepository',
      useClass: ProductRepository,
    },
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
})
export class SaleModule { }

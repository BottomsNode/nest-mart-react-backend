import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { MyMapperProfile } from 'src/common';
import { ProductRepository } from './repository/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    MyMapperProfile,
    {
      provide: 'ProductRepository',
      useClass: ProductRepository,
    },
  ],
})
export class ProductModule {}

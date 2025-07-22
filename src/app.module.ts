import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { AddressModule } from './modules/address/address.module';
import { ProductModule } from './modules/product/product.module';
import { SaleModule } from './modules/sale/sale.module';
import { DatabaseService } from './config/connection.msg';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { AutomapperModule } from '@automapper/nestjs';
import { AuthMiddleware, NODE_ENV } from './common';
import { UserController } from './modules/user/user.controller';
import { AddressController } from './modules/address/address.controller';
import { ProductController } from './modules/product/product.controller';
import { SaleController } from './modules/sale/controllers/sale.controller';
import { SaleItemController } from './modules/sale/controllers/saleItem.controller';
import { ProfileModule } from './modules/profile/profile.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(AppDataSource.options),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    AutomapperModule,
    AuthModule,
    AddressModule,
    ProductModule,
    SaleModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({
        path: '/user/password/reset',
        method: RequestMethod.PUT,
      })
      .forRoutes(
        UserController,
        AddressController,
        ProductController,
        SaleController,
        SaleItemController,
      );
    // OR for a specific route:
    // .forRoutes({ path: 'your-route', method: RequestMethod.GET });
  }
}

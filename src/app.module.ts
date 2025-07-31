import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './common';
import { DatabaseService } from './config/connection.msg';
import { AppDataSource } from './config/typeorm.config';

import { AuthModule } from './modules/auth/auth.module';
import { AddressModule } from './modules/address/address.module';
import { ProductModule } from './modules/product/product.module';
import { SaleModule } from './modules/sale/sale.module';
import { ProfileModule } from './modules/profile/profile.module';
import { MailModule } from './modules/mail/mail.module';

import { UserController } from './modules/user/user.controller';
import { AddressController } from './modules/address/address.controller';
import { ProductController } from './modules/product/product.controller';
import { SaleController } from './modules/sale/controllers/sale.controller';
import { SaleItemController } from './modules/sale/controllers/saleItem.controller';
import { CustomerActivityLogModule } from './modules/logs/customer-activity-log.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    MulterModule.register({ dest: './uploads' }),
    ScheduleModule.forRoot(),

    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10),
        password: process.env.REDIS_PASSWORD || undefined,
      },
    }),
    BullModule.registerQueue({
      name: 'mail',
    }),

    // feature modules
    MailModule,
    CustomerActivityLogModule,
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
  }
}

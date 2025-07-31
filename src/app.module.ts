import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { join } from 'path';

import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { AuthMiddleware } from 'src/common';
import { DatabaseService } from 'src/config/connection.msg';
import { AppDataSource } from 'src/config/typeorm.config';

import { AuthModule } from 'src/modules/auth/auth.module';
import { AddressModule } from 'src/modules/address/address.module';
import { ProductModule } from 'src/modules/product/product.module';
import { SaleModule } from 'src/modules/sale/sale.module';
import { ProfileModule } from 'src/modules/profile/profile.module';
import { MailModule } from 'src/modules/mail/mail.module';

import { UserController } from 'src/modules/user/user.controller';
import { AddressController } from 'src/modules/address/address.controller';
import { ProductController } from 'src/modules/product/product.controller';
import { SaleController } from 'src/modules/sale/controllers/sale.controller';
import { SaleItemController } from 'src/modules/sale/controllers/saleItem.controller';
import { CustomerActivityLogModule } from 'src/modules/logs/customer-activity-log.module';

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
    MulterModule.register({ dest: 'src/uploads' }),
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

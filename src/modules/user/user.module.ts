import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/user.entity';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { MyMapperProfile } from 'src/common';
import { AddressModule } from '../address/address.module';
import { UserRepository } from './repository/user.repository';
import { AuthModule } from '../auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { MailService } from '../mail/mail.service';
import { CustomerActivityLogModule } from '../logs/log/customer-activity-log.module';
@Module({
  imports: [
    forwardRef(() => AuthModule),
    AddressModule,
    CustomerActivityLogModule,
    TypeOrmModule.forFeature([CustomerEntity]),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    BullModule.registerQueue({ name: 'mail' }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    MailService,
    MyMapperProfile,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule { }

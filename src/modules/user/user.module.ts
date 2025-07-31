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
import { CustomerActivityLogModule } from '../log/customer-activity-log.module';
import { MailModule } from '../mail/mail.module';
@Module({
  imports: [
    forwardRef(() => AuthModule),
    MailModule,
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
    MyMapperProfile,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule { }

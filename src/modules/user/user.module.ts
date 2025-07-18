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
@Module({
  imports: [
    forwardRef(() => AuthModule),
    AddressModule,
    TypeOrmModule.forFeature([CustomerEntity]),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
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
export class UserModule {}

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtSecret } from 'src/common';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsEntity } from './entities/permission.entity';
import { RolesEntity } from './entities/role.entity';
import { RolesRepository } from './repository/roles.repository';
import { redisProvider } from './redis.provider';
import { AuthCronService } from './cron-jobs';
import { CustomerActivityLogModule } from '../logs/customer-activity-log.module';

@Module({
  imports: [
    UserModule,
    CustomerActivityLogModule,
    TypeOrmModule.forFeature([PermissionsEntity, RolesEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    redisProvider,
    AuthCronService,
    AuthService,
    JwtStrategy,
    {
      provide: 'RolesRepository',
      useClass: RolesRepository,
    },
  ],
  exports: ['RolesRepository'],
})
export class AuthModule { }

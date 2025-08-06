import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerActivityLogService } from './customer-activity-log.service';
import { CustomerActivityLogEntity } from './entities/user-activity-log.entity';
import { CustomerActivityLogController } from './customer-activity-log.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerActivityLogEntity])],
  providers: [CustomerActivityLogService],
  controllers: [CustomerActivityLogController],
  exports: [CustomerActivityLogService],
})
export class CustomerActivityLogModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from 'src/modules/user/entities/user.entity';
import { CustomerActivityLogEntity } from './entities';

@Injectable()
export class CustomerActivityLogService {
  constructor(
    @InjectRepository(CustomerActivityLogEntity)
    private readonly repo: Repository<CustomerActivityLogEntity>,
  ) {}

  async log(
    customer: CustomerEntity,
    action: string,
    metadata?: any,
  ): Promise<void> {
    const log = this.repo.create({
      customer,
      action,
      metadata: metadata ? JSON.stringify(metadata) : null,
    });
    await this.repo.save(log);
  }

  async getAllLogs(): Promise<CustomerActivityLogEntity[]> {
    return this.repo.find({
      order: { createdAt: 'DESC' },
      relations: ['customer'],
    });
  }
}

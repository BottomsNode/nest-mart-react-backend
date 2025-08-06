import { CustomerEntity } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('customer_activity_logs')
export class CustomerActivityLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.logs, { eager: true })
  customer: CustomerEntity;

  @Column()
  action: string;

  @Column({ type: 'text', nullable: true })
  metadata?: string;

  @CreateDateColumn()
  createdAt: Date;
}

import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
} from 'typeorm';

export abstract class MyBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @AutoMap()
  @ApiProperty()
  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @AutoMap()
  @ApiProperty()
  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @AutoMap()
  @ApiProperty()
  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}

import { MyBaseEntity } from '../../../common';
import { Column, Entity } from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity('permission')
export class PermissionsEntity extends MyBaseEntity {
  @Column({ unique: true })
  @AutoMap()
  name: string;
}

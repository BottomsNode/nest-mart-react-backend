import { AutoMap } from '@automapper/classes';
import { MyBaseEntity } from '../../../common';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { PermissionsEntity } from './permission.entity';

@Entity('roles')
export class RolesEntity extends MyBaseEntity {
  @Column({ unique: true })
  @AutoMap()
  name: string;

  @ManyToMany(() => PermissionsEntity, {
    eager: true,
    cascade: true,
    nullable: false,
  })
  @JoinTable()
  permissions: PermissionsEntity[];
}

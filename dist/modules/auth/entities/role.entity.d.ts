import { MyBaseEntity } from '../../../common';
import { PermissionsEntity } from './permission.entity';
export declare class RolesEntity extends MyBaseEntity {
    name: string;
    permissions: PermissionsEntity[];
}

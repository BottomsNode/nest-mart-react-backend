import { RolesEntity } from 'src/modules/auth/entities/role.entity';

export interface AuthenticatedUser {
  id: number;
  userId: number;
  role: string;
  permission: RolesEntity;
}

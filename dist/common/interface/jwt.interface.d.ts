import { RolesEntity } from 'src/modules/auth/entities/role.entity';
export interface JwtPayload {
    id: string | number;
    email: string;
    role: string;
    permissions: RolesEntity;
}

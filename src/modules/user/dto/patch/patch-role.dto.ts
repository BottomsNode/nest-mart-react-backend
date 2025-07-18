import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { RolesEntity } from 'src/modules/auth/entities/role.entity';

export class PatchRoleDTO {
  @AutoMap()
  @ApiProperty()
  role: RolesEntity;
}

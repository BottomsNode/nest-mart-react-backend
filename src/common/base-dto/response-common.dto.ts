import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseCommonDto {
  @AutoMap()
  @ApiProperty()
  id: number;
  @AutoMap()
  @ApiProperty()
  createdAt?: Date;
  @AutoMap()
  @ApiProperty()
  updatedAt?: Date;
}

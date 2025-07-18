import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class PatchPasswordDTO {
  @IsString()
  @ApiProperty()
  @MinLength(6)
  @AutoMap()
  password: string;
}

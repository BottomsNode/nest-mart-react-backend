import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class PatchPasswordDTO {
  @IsString()
  @ApiProperty()
  @MinLength(6)
  @AutoMap()
  password: string;

  @IsEmail()
  @AutoMap()
  @ApiProperty()
  email: string;
}

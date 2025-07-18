import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class PatchEmailDTO {
  @IsEmail()
  @ApiProperty()
  @AutoMap()
  email: string;
}

import { IsInt, Min } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdParamDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  Id: number;
}

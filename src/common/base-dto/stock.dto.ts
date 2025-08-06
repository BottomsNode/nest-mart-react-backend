import { IsInt, Min } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StockDTO {
  @ApiProperty()
  @IsInt()
  @Min(1)
  stock: number;
}

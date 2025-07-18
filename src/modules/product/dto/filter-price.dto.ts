import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsEnum } from 'class-validator';
import { PRODUCT_STATUS } from 'src/common';

export class FilterProductDTO {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ required: false })
  min?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ required: false })
  max?: number;

  @IsOptional()
  @ApiProperty()
  @ApiProperty({ required: false })
  @IsEnum(PRODUCT_STATUS)
  status?: PRODUCT_STATUS;
}

import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { PRODUCT_STATUS } from 'src/common';

export class CreateProductDTO {
  @IsString()
  @ApiProperty()
  @AutoMap()
  name: string;

  @IsNumber()
  @AutoMap()
  @ApiProperty()
  price: number;

  @IsNumber()
  @AutoMap()
  @ApiProperty()
  stock: number;

  @AutoMap()
  @IsEnum(PRODUCT_STATUS)
  status: PRODUCT_STATUS;
}

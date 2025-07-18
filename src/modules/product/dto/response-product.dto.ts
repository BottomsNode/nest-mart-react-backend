import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { PRODUCT_STATUS, ResponseCommonDto } from 'src/common';

export class ProductResponseDTO extends ResponseCommonDto {
  @AutoMap()
  @ApiProperty()
  name: string;
  @AutoMap()
  @ApiProperty()
  price: number;
  @AutoMap()
  @ApiProperty()
  stock: number;
  @AutoMap()
  @ApiProperty()
  status: PRODUCT_STATUS;
}

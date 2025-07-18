import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { PRODUCT_STATUS } from 'src/common';

export class ProductMainDTO {
  @AutoMap()
  @ApiProperty()
  public id: number;
  @AutoMap()
  @ApiProperty()
  public name: string;
  @AutoMap()
  @ApiProperty()
  public createdAt: Date;
  @AutoMap()
  @ApiProperty()
  public price: number;
  @AutoMap()
  @ApiProperty()
  public stock: number;
  @AutoMap()
  @ApiProperty()
  public status: PRODUCT_STATUS;
}

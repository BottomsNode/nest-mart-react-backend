import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ProductMainDTO } from 'src/modules/product/dto/main-product.dto';

export class SaleItemDTO {
  @AutoMap()
  @ApiProperty()
  public id: number;
  @AutoMap()
  @ApiProperty()
  public quantity: number;
  @AutoMap()
  @ApiProperty()
  public priceAtPurchase: number;
  @AutoMap()
  public product: ProductMainDTO;
}

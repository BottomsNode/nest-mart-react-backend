import { ProductResponseDTO } from 'src/modules/product/dto/response-product.dto';
import { ResponseCommonDto } from 'src/common';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class SaleItemResponseDTO extends ResponseCommonDto {
  @AutoMap()
  @ApiProperty()
  product: ProductResponseDTO;
  @AutoMap()
  @ApiProperty()
  quantity: number;
  @AutoMap()
  @ApiProperty()
  priceAtPurchase: number;
}

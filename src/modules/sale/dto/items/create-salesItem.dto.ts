import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateSaleItemDTO {
  @IsNumber()
  @AutoMap()
  @ApiProperty()
  id: number;

  @IsNumber()
  @AutoMap()
  @ApiProperty()
  quantity: number;

  @IsNumber()
  @AutoMap()
  @ApiProperty()
  priceAtPurchase: number;
}

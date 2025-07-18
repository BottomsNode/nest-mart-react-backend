import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { CreateSaleItemDTO } from '../items/create-salesItem.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSaleDTO {
  @IsNumber()
  @AutoMap()
  totalAmount: number;

  @ApiProperty()
  @IsNumber()
  @AutoMap()
  customerId: number;

  @AutoMap()
  @ApiProperty({ type: [CreateSaleItemDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSaleItemDTO)
  items: CreateSaleItemDTO[];
}

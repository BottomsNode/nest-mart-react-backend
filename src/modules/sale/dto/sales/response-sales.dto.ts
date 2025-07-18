import { CustomerResponseDTO } from 'src/modules/user/dto/response-customer.dto';
import { ResponseCommonDto } from 'src/common';
import { SaleItemDTO } from '../items/main-salesItem.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class SaleResponseDTO extends ResponseCommonDto {
  @AutoMap()
  @ApiProperty()
  customer: CustomerResponseDTO;
  @AutoMap()
  @ApiProperty()
  deletedAt?: Date;
  @AutoMap()
  @ApiProperty()
  saleDate?: Date;
  @AutoMap()
  @ApiProperty()
  totalAmount: number;
  @AutoMap()
  @ApiProperty()
  customerId: number;
  @AutoMap()
  @ApiProperty()
  items: SaleItemDTO[];
}

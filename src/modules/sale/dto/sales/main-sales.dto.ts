import { CustomerResponseDTO } from 'src/modules/user/dto/response-customer.dto';
import { SaleItemDTO } from '../items/main-salesItem.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class SaleDTO {
  @AutoMap()
  @ApiProperty()
  public id: number;
  @AutoMap()
  @ApiProperty()
  public saleDate?: Date;
  @AutoMap()
  @ApiProperty()
  public totalAmount: number;
  @AutoMap()
  @ApiProperty()
  public customer: CustomerResponseDTO;
  @AutoMap()
  @ApiProperty()
  public items: SaleItemDTO[];
}

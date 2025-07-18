import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseCommonDto } from 'src/common';
import { AddressMainDTO } from 'src/modules/address/dto/main-address.dto';
import { RolesEntity } from 'src/modules/auth/entities/role.entity';
import { SaleDTO } from 'src/modules/sale/dto/sales/main-sales.dto';

export class CustomerResponseDTO extends ResponseCommonDto {
  @AutoMap()
  @ApiProperty()
  name: string;
  @AutoMap()
  @ApiProperty()
  phone: string;
  @AutoMap()
  @ApiProperty()
  email: string;
  @AutoMap()
  @ApiProperty()
  isActive: boolean;
  @AutoMap()
  @ApiProperty()
  role: RolesEntity;
  @AutoMap()
  address: AddressMainDTO;
  @AutoMap()
  sales?: SaleDTO[];
  @AutoMap()
  @ApiProperty()
  deletedAt?: Date;
  password: string;
}

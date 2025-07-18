import { AddressMainDTO } from 'src/modules/address/dto/main-address.dto';
import { SaleDTO } from 'src/modules/sale/dto/sales/main-sales.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { RolesEntity } from 'src/modules/auth/entities/role.entity';

export class CustomerMainDTO {
  @AutoMap()
  @ApiProperty()
  public id: number;
  @AutoMap()
  @ApiProperty()
  public name: string;
  @AutoMap()
  @ApiProperty()
  public phone: string;
  @AutoMap()
  @ApiProperty()
  public createdAt: string;
  @AutoMap()
  @ApiProperty()
  public email: string;
  @AutoMap()
  @ApiProperty()
  public password: string;
  @AutoMap()
  @ApiProperty()
  public isActive: boolean;
  @AutoMap()
  @ApiProperty()
  public role: RolesEntity;
  @AutoMap()
  @ApiProperty()
  public address: AddressMainDTO;
  @AutoMap()
  @ApiProperty()
  public sales?: SaleDTO[];
}

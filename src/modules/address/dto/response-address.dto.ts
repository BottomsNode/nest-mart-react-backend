import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseCommonDto } from 'src/common';

export class AddressResponseDTO extends ResponseCommonDto {
  @AutoMap()
  @ApiProperty()
  street: string;
  @AutoMap()
  @ApiProperty()
  city: string;
  @AutoMap()
  @ApiProperty()
  pincode: string;
}

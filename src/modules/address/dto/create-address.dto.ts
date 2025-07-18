import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAddressDTO {
  @ApiProperty()
  @AutoMap()
  @IsString()
  street: string;

  @ApiProperty()
  @IsString()
  @AutoMap()
  city: string;

  @ApiProperty()
  @IsString()
  @AutoMap()
  pincode: string;
}

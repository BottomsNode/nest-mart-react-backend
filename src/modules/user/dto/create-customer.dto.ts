import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAddressDTO } from 'src/modules/address/dto/create-address.dto';
import { AutoMap } from '@automapper/classes';

export class CreateCustomerDTO {
  @ApiProperty()
  @AutoMap()
  @IsString()
  name: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  phone: string;

  @ApiProperty()
  @AutoMap()
  @IsEmail()
  email: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  password: string;

  @AutoMap()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @AutoMap()
  roleId: string;

  @ApiProperty({ required: false, type: () => CreateAddressDTO })
  @AutoMap()
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressDTO)
  address?: CreateAddressDTO;
}

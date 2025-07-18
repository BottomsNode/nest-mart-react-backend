import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PatchAddressDTO {
  @IsOptional()
  @ApiProperty()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  city?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  pincode?: string;
}

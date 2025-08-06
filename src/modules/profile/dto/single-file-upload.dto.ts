import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { MAX_PROFILE_PICTURE_SIZE_IN_BYTES, MaxFileSize } from 'src/common';

export class SingleFileUploadDto {
  @ApiProperty({
    description: 'A single file to upload',
    type: 'string',
    format: 'binary',
  })
  @MaxFileSize(MAX_PROFILE_PICTURE_SIZE_IN_BYTES, {
    message: 'File size must not exceed 5MB',
  })
  @IsOptional()
  file: any;
}

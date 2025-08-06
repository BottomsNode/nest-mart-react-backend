import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { MAX_PROFILE_PICTURE_SIZE_IN_BYTES, MaxFileSize } from 'src/common';

export class MultiFilesUploadDto {
  @ApiProperty({
    description: 'A file or files to upload',
    type: 'string',
    format: 'binary',
    isArray: true,
  })
  @IsArray()
  @MaxFileSize(MAX_PROFILE_PICTURE_SIZE_IN_BYTES, {
    message: 'File size must not exceed 5MB',
  })
  @IsOptional()
  files: any[];
}

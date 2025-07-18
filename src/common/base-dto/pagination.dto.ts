import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { Pagination_Length } from '../constants';

export class PaginationRequestDto {
  @ApiProperty({
    required: false,
    description: 'Page number (1-based)',
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = Pagination_Length.START;

  @ApiProperty({
    required: false,
    description: 'Number of items per page',
    default: Pagination_Length.VERY_SMALL,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = Pagination_Length.VERY_SMALL;
}

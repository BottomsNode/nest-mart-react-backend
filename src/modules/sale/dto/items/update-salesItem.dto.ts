import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleItemDTO } from './create-salesItem.dto';

export class UpdateSaleItemDTO extends PartialType(CreateSaleItemDTO) {}

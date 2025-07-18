import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleDTO } from './create-sales.dto';

export class UpdateSaleDTO extends PartialType(CreateSaleDTO) {}

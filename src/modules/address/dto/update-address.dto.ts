import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDTO } from './create-address.dto';

export class UpdateAddressDTO extends PartialType(CreateAddressDTO) {}

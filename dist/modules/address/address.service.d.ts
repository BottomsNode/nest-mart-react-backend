import { Repository } from 'typeorm';
import { AddressEntity } from './entities/address.entity';
import { Mapper } from '@automapper/core';
import { AddressResponseDTO } from './dto/response-address.dto';
import { PatchAddressDTO } from './dto/patch/patch-address.dto';
export declare class AddressService {
    private readonly addressRepo;
    private readonly mapper;
    constructor(addressRepo: Repository<AddressEntity>, mapper: Mapper);
    updateAddress(id: number, dto: PatchAddressDTO): Promise<AddressResponseDTO>;
}

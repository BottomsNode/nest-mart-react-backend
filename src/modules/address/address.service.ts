import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from './entities/address.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { AddressResponseDTO } from './dto/response-address.dto';
import { AddressMainDTO } from './dto/main-address.dto';
import { PatchAddressDTO } from './dto/patch/patch-address.dto';
import { CustomNotFoundException } from 'src/common';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepo: Repository<AddressEntity>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async updateAddress(
    id: number,
    dto: PatchAddressDTO,
  ): Promise<AddressResponseDTO> {
    const address = await this.addressRepo.findOneBy({ id });
    if (!address) throw new CustomNotFoundException('Address not found');

    Object.assign(address, dto);
    const saved = await this.addressRepo.save(address);

    const main = this.mapper.map(saved, AddressEntity, AddressMainDTO);
    return this.mapper.map(main, AddressMainDTO, AddressResponseDTO);
  }
}

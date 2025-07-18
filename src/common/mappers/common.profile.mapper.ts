import { createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';

// Address
import { CreateAddressDTO } from 'src/modules/address/dto/create-address.dto';
import { AddressMainDTO } from 'src/modules/address/dto/main-address.dto';
import { AddressResponseDTO } from 'src/modules/address/dto/response-address.dto';
import { AddressEntity } from 'src/modules/address/entities/address.entity';

// Customer
import { CreateCustomerDTO } from 'src/modules/user/dto/create-customer.dto';
import { CustomerResponseDTO } from 'src/modules/user/dto/response-customer.dto';
import { CustomerEntity } from 'src/modules/user/entities/user.entity';

// Product
import { CreateProductDTO } from 'src/modules/product/dto/create-product.dto';
import { ProductMainDTO } from 'src/modules/product/dto/main-product.dto';
import { ProductResponseDTO } from 'src/modules/product/dto/response-product.dto';
import { ProductEntity } from 'src/modules/product/entities/product.entity';

// SaleItem
import { CreateSaleItemDTO } from 'src/modules/sale/dto/items/create-salesItem.dto';
import { SaleItemDTO } from 'src/modules/sale/dto/items/main-salesItem.dto';
import { SaleItemResponseDTO } from 'src/modules/sale/dto/items/response-salesItem.dto';
import { SaleItemEntity } from 'src/modules/sale/entities/items/sale-item.entity';

// Sale
import { CreateSaleDTO } from 'src/modules/sale/dto/sales/create-sales.dto';
import { SaleDTO } from 'src/modules/sale/dto/sales/main-sales.dto';
import { SaleResponseDTO } from 'src/modules/sale/dto/sales/response-sales.dto';
import { SaleEntity } from 'src/modules/sale/entities/sales/sales.entity';
import { CustomerMainDTO } from 'src/modules/user/dto/main-customer..dto';

@Injectable()
export class MyMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      // ADDRESS
      createMap(mapper, CreateAddressDTO, AddressMainDTO);
      createMap(mapper, AddressMainDTO, AddressEntity);
      createMap(mapper, AddressEntity, AddressMainDTO);
      createMap(mapper, AddressMainDTO, AddressResponseDTO);
      createMap(mapper, CreateAddressDTO, AddressEntity); // Direct mapping (for fallback)

      // CUSTOMER
      createMap(mapper, CreateCustomerDTO, CustomerMainDTO);
      createMap(
        mapper,
        CustomerMainDTO,
        CustomerEntity,
        forMember(
          (dest) => dest.address,
          mapFrom((src) => src.address),
        ),
      );
      createMap(
        mapper,
        CustomerEntity,
        CustomerMainDTO,
        forMember(
          (dest) => dest.address,
          mapFrom((src) => src.address),
        ),
      );
      createMap(
        mapper,
        CustomerMainDTO,
        CustomerResponseDTO,
        forMember(
          (dest) => dest.address,
          mapFrom(
            (src) => src.address,
            // street: src.address?.street,
            // city: src.address?.city,
            // pincode: src.address?.pincode,
          ),
        ),
      );
      createMap(
        mapper,
        CreateCustomerDTO,
        CustomerEntity,
        forMember(
          (dest) => dest.address,
          mapFrom((src) => src.address),
        ),
      );
      createMap(
        mapper,
        CustomerEntity,
        CustomerResponseDTO,
        forMember(
          (dest) => dest.address,
          mapFrom((src) => ({
            street: src.address?.street,
            city: src.address?.city,
            pincode: src.address?.pincode,
          })),
        ),
      );

      // PRODUCT
      createMap(mapper, CreateProductDTO, ProductMainDTO);
      createMap(mapper, ProductMainDTO, ProductEntity);
      createMap(mapper, ProductEntity, ProductMainDTO);
      createMap(mapper, ProductMainDTO, ProductResponseDTO);
      createMap(mapper, CreateProductDTO, ProductEntity);
      createMap(mapper, ProductEntity, ProductResponseDTO);

      // SALE ITEM
      createMap(mapper, CreateSaleItemDTO, SaleItemDTO);
      createMap(
        mapper,
        SaleItemDTO,
        SaleItemEntity,
        forMember(
          (dest) => dest.product,
          mapFrom((src) => ({ id: src.id })),
        ),
      );
      createMap(
        mapper,
        SaleItemEntity,
        SaleItemDTO,
        forMember(
          (dest) => dest.id,
          mapFrom((src) => src.product?.id),
        ),
      );
      createMap(
        mapper,
        SaleItemDTO,
        SaleItemResponseDTO,
        forMember(
          (dest) => dest.product,
          // mapFrom((src) => src.product),
          mapFrom((src) => ({
            id: src.product?.id,
            name: src.product?.name,
          })),
        ),
      );
      createMap(mapper, CreateSaleItemDTO, SaleItemEntity);

      // SALE
      createMap(mapper, CreateSaleDTO, SaleDTO);
      createMap(
        mapper,
        SaleEntity,
        SaleDTO,
        forMember(
          (dest) => dest.customer,
          mapFrom((src) => ({
            id: src.customer?.id,
            name: src.customer?.name,
            email: src.customer?.email,
          })),
        ),
        forMember(
          (dest) => dest.items,
          mapFrom((src) => src.items),
        ),
      );
      createMap(
        mapper,
        SaleDTO,
        SaleResponseDTO,
        forMember(
          (dest) => dest.customer,
          mapFrom((src) => src.customer),
        ),
        forMember(
          (dest) => dest.items,
          mapFrom((src) => src.items),
        ),
      );
      createMap(mapper, SaleEntity, SaleResponseDTO);
    };
  }
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyMapperProfile = void 0;
const core_1 = require("@automapper/core");
const nestjs_1 = require("@automapper/nestjs");
const common_1 = require("@nestjs/common");
const create_address_dto_1 = require("../../modules/address/dto/create-address.dto");
const main_address_dto_1 = require("../../modules/address/dto/main-address.dto");
const response_address_dto_1 = require("../../modules/address/dto/response-address.dto");
const address_entity_1 = require("../../modules/address/entities/address.entity");
const create_customer_dto_1 = require("../../modules/user/dto/create-customer.dto");
const response_customer_dto_1 = require("../../modules/user/dto/response-customer.dto");
const user_entity_1 = require("../../modules/user/entities/user.entity");
const create_product_dto_1 = require("../../modules/product/dto/create-product.dto");
const main_product_dto_1 = require("../../modules/product/dto/main-product.dto");
const response_product_dto_1 = require("../../modules/product/dto/response-product.dto");
const product_entity_1 = require("../../modules/product/entities/product.entity");
const create_salesItem_dto_1 = require("../../modules/sale/dto/items/create-salesItem.dto");
const main_salesItem_dto_1 = require("../../modules/sale/dto/items/main-salesItem.dto");
const response_salesItem_dto_1 = require("../../modules/sale/dto/items/response-salesItem.dto");
const sale_item_entity_1 = require("../../modules/sale/entities/items/sale-item.entity");
const create_sales_dto_1 = require("../../modules/sale/dto/sales/create-sales.dto");
const main_sales_dto_1 = require("../../modules/sale/dto/sales/main-sales.dto");
const response_sales_dto_1 = require("../../modules/sale/dto/sales/response-sales.dto");
const sales_entity_1 = require("../../modules/sale/entities/sales/sales.entity");
const main_customer__dto_1 = require("../../modules/user/dto/main-customer..dto");
let MyMapperProfile = class MyMapperProfile extends nestjs_1.AutomapperProfile {
    constructor(mapper) {
        super(mapper);
    }
    get profile() {
        return (mapper) => {
            (0, core_1.createMap)(mapper, create_address_dto_1.CreateAddressDTO, main_address_dto_1.AddressMainDTO);
            (0, core_1.createMap)(mapper, main_address_dto_1.AddressMainDTO, address_entity_1.AddressEntity);
            (0, core_1.createMap)(mapper, address_entity_1.AddressEntity, main_address_dto_1.AddressMainDTO);
            (0, core_1.createMap)(mapper, main_address_dto_1.AddressMainDTO, response_address_dto_1.AddressResponseDTO);
            (0, core_1.createMap)(mapper, create_address_dto_1.CreateAddressDTO, address_entity_1.AddressEntity);
            (0, core_1.createMap)(mapper, create_customer_dto_1.CreateCustomerDTO, main_customer__dto_1.CustomerMainDTO);
            (0, core_1.createMap)(mapper, main_customer__dto_1.CustomerMainDTO, user_entity_1.CustomerEntity, (0, core_1.forMember)((dest) => dest.address, (0, core_1.mapFrom)((src) => src.address)));
            (0, core_1.createMap)(mapper, user_entity_1.CustomerEntity, main_customer__dto_1.CustomerMainDTO, (0, core_1.forMember)((dest) => dest.address, (0, core_1.mapFrom)((src) => src.address)));
            (0, core_1.createMap)(mapper, main_customer__dto_1.CustomerMainDTO, response_customer_dto_1.CustomerResponseDTO, (0, core_1.forMember)((dest) => dest.address, (0, core_1.mapFrom)((src) => src.address)));
            (0, core_1.createMap)(mapper, create_customer_dto_1.CreateCustomerDTO, user_entity_1.CustomerEntity, (0, core_1.forMember)((dest) => dest.address, (0, core_1.mapFrom)((src) => src.address)));
            (0, core_1.createMap)(mapper, user_entity_1.CustomerEntity, response_customer_dto_1.CustomerResponseDTO, (0, core_1.forMember)((dest) => dest.address, (0, core_1.mapFrom)((src) => ({
                street: src.address?.street,
                city: src.address?.city,
                pincode: src.address?.pincode,
            }))));
            (0, core_1.createMap)(mapper, create_product_dto_1.CreateProductDTO, main_product_dto_1.ProductMainDTO);
            (0, core_1.createMap)(mapper, main_product_dto_1.ProductMainDTO, product_entity_1.ProductEntity);
            (0, core_1.createMap)(mapper, product_entity_1.ProductEntity, main_product_dto_1.ProductMainDTO);
            (0, core_1.createMap)(mapper, main_product_dto_1.ProductMainDTO, response_product_dto_1.ProductResponseDTO);
            (0, core_1.createMap)(mapper, create_product_dto_1.CreateProductDTO, product_entity_1.ProductEntity);
            (0, core_1.createMap)(mapper, product_entity_1.ProductEntity, response_product_dto_1.ProductResponseDTO);
            (0, core_1.createMap)(mapper, create_salesItem_dto_1.CreateSaleItemDTO, main_salesItem_dto_1.SaleItemDTO);
            (0, core_1.createMap)(mapper, main_salesItem_dto_1.SaleItemDTO, sale_item_entity_1.SaleItemEntity, (0, core_1.forMember)((dest) => dest.product, (0, core_1.mapFrom)((src) => ({ id: src.id }))));
            (0, core_1.createMap)(mapper, sale_item_entity_1.SaleItemEntity, main_salesItem_dto_1.SaleItemDTO, (0, core_1.forMember)((dest) => dest.id, (0, core_1.mapFrom)((src) => src.product?.id)));
            (0, core_1.createMap)(mapper, main_salesItem_dto_1.SaleItemDTO, response_salesItem_dto_1.SaleItemResponseDTO, (0, core_1.forMember)((dest) => dest.product, (0, core_1.mapFrom)((src) => ({
                id: src.product?.id,
                name: src.product?.name,
            }))));
            (0, core_1.createMap)(mapper, create_salesItem_dto_1.CreateSaleItemDTO, sale_item_entity_1.SaleItemEntity);
            (0, core_1.createMap)(mapper, create_sales_dto_1.CreateSaleDTO, main_sales_dto_1.SaleDTO);
            (0, core_1.createMap)(mapper, sales_entity_1.SaleEntity, main_sales_dto_1.SaleDTO, (0, core_1.forMember)((dest) => dest.customer, (0, core_1.mapFrom)((src) => ({
                id: src.customer?.id,
                name: src.customer?.name,
                email: src.customer?.email,
            }))), (0, core_1.forMember)((dest) => dest.items, (0, core_1.mapFrom)((src) => src.items)));
            (0, core_1.createMap)(mapper, main_sales_dto_1.SaleDTO, response_sales_dto_1.SaleResponseDTO, (0, core_1.forMember)((dest) => dest.customer, (0, core_1.mapFrom)((src) => src.customer)), (0, core_1.forMember)((dest) => dest.items, (0, core_1.mapFrom)((src) => src.items)));
            (0, core_1.createMap)(mapper, sales_entity_1.SaleEntity, response_sales_dto_1.SaleResponseDTO);
        };
    }
};
exports.MyMapperProfile = MyMapperProfile;
exports.MyMapperProfile = MyMapperProfile = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [Object])
], MyMapperProfile);
//# sourceMappingURL=common.profile.mapper.js.map
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
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const address_entity_1 = require("./entities/address.entity");
const nestjs_1 = require("@automapper/nestjs");
const response_address_dto_1 = require("./dto/response-address.dto");
const main_address_dto_1 = require("./dto/main-address.dto");
const common_2 = require("../../common");
let AddressService = class AddressService {
    addressRepo;
    mapper;
    constructor(addressRepo, mapper) {
        this.addressRepo = addressRepo;
        this.mapper = mapper;
    }
    async updateAddress(id, dto) {
        const address = await this.addressRepo.findOneBy({ id });
        if (!address)
            throw new common_2.CustomNotFoundException('Address not found');
        Object.assign(address, dto);
        const saved = await this.addressRepo.save(address);
        const main = this.mapper.map(saved, address_entity_1.AddressEntity, main_address_dto_1.AddressMainDTO);
        return this.mapper.map(main, main_address_dto_1.AddressMainDTO, response_address_dto_1.AddressResponseDTO);
    }
};
exports.AddressService = AddressService;
exports.AddressService = AddressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(address_entity_1.AddressEntity)),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], AddressService);
//# sourceMappingURL=address.service.js.map
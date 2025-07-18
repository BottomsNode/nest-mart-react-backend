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
exports.SaleItemService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("../../common");
const response_salesItem_dto_1 = require("./dto/items/response-salesItem.dto");
const nestjs_1 = require("@automapper/nestjs");
const main_salesItem_dto_1 = require("./dto/items/main-salesItem.dto");
const salesItem_repository_1 = require("./repository/salesItem.repository");
let SaleItemService = class SaleItemService {
    salesItemRepo;
    mapper;
    constructor(salesItemRepo, mapper) {
        this.salesItemRepo = salesItemRepo;
        this.mapper = mapper;
    }
    async getAllSaleItems() {
        const saleItems = await this.salesItemRepo.find({ relations: ['product'] });
        if (!saleItems || saleItems.length === 0)
            throw new common_2.CustomNotFoundException(`No Sale Items Yet..!`);
        const sales_map = this.mapper.mapArray(saleItems, main_salesItem_dto_1.SaleItemDTO, response_salesItem_dto_1.SaleItemResponseDTO);
        return sales_map;
    }
    async getSaleItemById(params) {
        const saleItem = await this.salesItemRepo.findOne({
            where: { id: params.Id },
            relations: ['product'],
        });
        if (!saleItem)
            throw new common_2.CustomNotFoundException(`Sale Item with ID ${params.Id} not found`);
        const sales_map = this.mapper.map(saleItem, main_salesItem_dto_1.SaleItemDTO, response_salesItem_dto_1.SaleItemResponseDTO);
        return sales_map;
    }
    async updateSaleItem(params, dto) {
        const saleItem = await this.salesItemRepo.findOne({
            where: { id: params.Id },
            relations: ['product'],
        });
        if (!saleItem)
            throw new common_2.CustomNotFoundException(`Sale Item with ID ${params.Id} not found`);
        Object.assign(saleItem, dto);
        const updated = await this.salesItemRepo.update(params.Id, saleItem);
        return updated;
    }
    async deleteSaleItem(params) {
        const saleItem = await this.salesItemRepo.findOne({
            where: { id: params.Id },
        });
        if (!saleItem)
            throw new common_2.CustomNotFoundException(`Sale Item with ID ${params.Id} not found`);
        await this.salesItemRepo.delete(params.Id);
    }
};
exports.SaleItemService = SaleItemService;
exports.SaleItemService = SaleItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SalesItemRepository')),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [salesItem_repository_1.SalesItemRepository, Object])
], SaleItemService);
//# sourceMappingURL=saleItem.service.js.map
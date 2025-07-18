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
exports.SalesRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sales_entity_1 = require("../entities/sales/sales.entity");
const common_2 = require("../../../common");
const nestjs_1 = require("@automapper/nestjs");
let SalesRepository = class SalesRepository extends common_2.BaseRepository {
    salesRepo;
    mapper;
    constructor(salesRepo, mapper) {
        super(salesRepo);
        this.salesRepo = salesRepo;
        this.mapper = mapper;
    }
    async queryBuilder(query, params = []) {
        return await this.salesRepo.query(query, params);
    }
    async getAllSalesWithDetails() {
        return await this.salesRepo
            .createQueryBuilder('sale')
            .leftJoinAndSelect('sale.customer', 'customer')
            .leftJoinAndSelect('sale.items', 'saleItem')
            .leftJoinAndSelect('saleItem.product', 'product')
            .orderBy('sale.createdAt', 'DESC')
            .getMany();
    }
};
exports.SalesRepository = SalesRepository;
exports.SalesRepository = SalesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sales_entity_1.SaleEntity)),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], SalesRepository);
//# sourceMappingURL=sales.repository.js.map
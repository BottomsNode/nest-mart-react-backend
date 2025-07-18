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
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../entities/product.entity");
const nestjs_1 = require("@automapper/nestjs");
const typeorm_2 = require("typeorm");
const common_2 = require("../../../common");
const response_product_dto_1 = require("../dto/response-product.dto");
let ProductRepository = class ProductRepository extends common_2.BaseRepository {
    productRepo;
    mapper;
    constructor(productRepo, mapper) {
        super(productRepo);
        this.productRepo = productRepo;
        this.mapper = mapper;
    }
    async findByProductName(name) {
        return await this.productRepo.findOne({
            where: { name },
        });
    }
    async createProduct(dto) {
        const existingCustomer = await this.findOne({ where: { name: dto.name } });
        if (existingCustomer) {
            throw new common_1.HttpException('Product with this name already exists', common_1.HttpStatus.CONFLICT);
        }
        const entity = this.productRepo.create(dto);
        const savedEntity = await this.create(entity);
        return this.mapper.map(savedEntity, product_entity_1.ProductEntity, response_product_dto_1.ProductResponseDTO);
    }
    async listProducts(page = common_2.Pagination_Length.START, limit = common_2.Pagination_Length.VERY_SMALL, flag = true) {
        const [products, count] = await this.productRepo.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
        });
        const product_mapped = this.mapper.mapArray(products, product_entity_1.ProductEntity, response_product_dto_1.ProductResponseDTO);
        const totalPages = Math.ceil(count / limit);
        return { products: product_mapped, count, totalPages };
    }
    async queryBuilder(query, params = []) {
        return await this.productRepo.query(query, params);
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], ProductRepository);
//# sourceMappingURL=product.repository.js.map
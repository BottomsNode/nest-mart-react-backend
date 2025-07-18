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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_1 = require("@automapper/nestjs");
const product_entity_1 = require("./entities/product.entity");
const create_product_dto_1 = require("./dto/create-product.dto");
const main_product_dto_1 = require("./dto/main-product.dto");
const response_product_dto_1 = require("./dto/response-product.dto");
const common_2 = require("../../common");
const product_repository_1 = require("./repository/product.repository");
let ProductService = class ProductService {
    productRepo;
    mapper;
    constructor(productRepo, mapper) {
        this.productRepo = productRepo;
        this.mapper = mapper;
    }
    async create(dto) {
        const exists = await this.productRepo.findByProductName(dto.name);
        if (exists)
            throw new common_2.CustomConflictException(`Product with name '${dto.name}' already exists`);
        const main = this.mapper.map(dto, create_product_dto_1.CreateProductDTO, main_product_dto_1.ProductMainDTO);
        const entity = this.mapper.map(main, main_product_dto_1.ProductMainDTO, product_entity_1.ProductEntity);
        const saved = await this.productRepo.createProduct(entity);
        const mainDto = this.mapper.map(saved, product_entity_1.ProductEntity, main_product_dto_1.ProductMainDTO);
        return this.mapper.map(mainDto, main_product_dto_1.ProductMainDTO, response_product_dto_1.ProductResponseDTO);
    }
    async getAll(pagination) {
        const data = await this.productRepo.listProducts(pagination.page, pagination.limit);
        if (!data.products || data.products.length === 0)
            throw new common_2.CustomNotFoundException(`Product not found`);
        const mappedProducts = this.mapper.mapArray(data.products, product_entity_1.ProductEntity, main_product_dto_1.ProductMainDTO);
        return {
            products: mappedProducts,
            totalRecords: data.count,
            totalPages: data.totalPages,
        };
    }
    async getOne(params) {
        const found = await this.productRepo.findOne({ where: { id: params.Id } });
        if (!found)
            throw new common_2.CustomNotFoundException(`Product with ID ${params.Id} not found`);
        const main = this.mapper.map(found, product_entity_1.ProductEntity, main_product_dto_1.ProductMainDTO);
        return this.mapper.map(main, main_product_dto_1.ProductMainDTO, response_product_dto_1.ProductResponseDTO);
    }
    async update(params, dto) {
        const entity = await this.productRepo.findOne({ where: { id: params.Id } });
        if (!entity)
            throw new common_2.CustomNotFoundException(`Product with ID ${params.Id} not found`);
        Object.assign(entity, dto);
        const saved = await this.productRepo.update(params.Id, entity);
        const main = this.mapper.map(saved, product_entity_1.ProductEntity, main_product_dto_1.ProductMainDTO);
        return this.mapper.map(main, main_product_dto_1.ProductMainDTO, response_product_dto_1.ProductResponseDTO);
    }
    async delete(params) {
        const entity = await this.productRepo.findOne({ where: { id: params.Id } });
        if (!entity)
            throw new common_2.CustomNotFoundException(`Product with ID ${params.Id} not found`);
        await this.productRepo.delete(params.Id);
    }
    async getActiveProducts(pagination) {
        const data = await this.productRepo.listProducts(pagination.page, pagination.limit);
        const mappedProducts = this.mapper.mapArray(data.products, product_entity_1.ProductEntity, response_product_dto_1.ProductResponseDTO);
        return {
            products: mappedProducts,
            totalRecords: data.count,
            totalPages: data.totalPages,
        };
    }
    async getDeactiveProducts(pagination) {
        const data = await this.productRepo.listProducts(pagination.page, pagination.limit, false);
        const mappedProducts = this.mapper.mapArray(data.products, product_entity_1.ProductEntity, response_product_dto_1.ProductResponseDTO);
        return {
            products: mappedProducts,
            totalRecords: data.count,
            totalPages: data.totalPages,
        };
    }
    async setStatus(params, status) {
        const product = await this.productRepo.findOne({
            where: { id: params.Id },
        });
        if (!product)
            throw new common_2.CustomNotFoundException('Product not found');
        product.status = status;
        console.log("-------------------------------", status);
        console.log(product.status);
        const saved = await this.productRepo.update(params.Id, product);
        const main = this.mapper.map(saved, product_entity_1.ProductEntity, main_product_dto_1.ProductMainDTO);
        return this.mapper.map(main, main_product_dto_1.ProductMainDTO, response_product_dto_1.ProductResponseDTO);
    }
    async searchByName(term) {
        const found = await this.productRepo.queryBuilder('SELECT * FROM product_entity WHERE name ILIKE $1', [`%${term}%`]);
        const mainList = this.mapper.mapArray(found, product_entity_1.ProductEntity, main_product_dto_1.ProductMainDTO);
        return this.mapper.mapArray(mainList, main_product_dto_1.ProductMainDTO, response_product_dto_1.ProductResponseDTO);
    }
    async updateStock(params, stock) {
        const product = await this.productRepo.findOne({
            where: { id: params.Id },
        });
        if (!product)
            throw new common_2.CustomNotFoundException('Product not found');
        product.stock = stock.stock;
        const saved = await this.productRepo.update(params.Id, product);
        const main = this.mapper.map(saved, product_entity_1.ProductEntity, main_product_dto_1.ProductMainDTO);
        return this.mapper.map(main, main_product_dto_1.ProductMainDTO, response_product_dto_1.ProductResponseDTO);
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ProductRepository')),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository, Object])
], ProductService);
//# sourceMappingURL=product.service.js.map
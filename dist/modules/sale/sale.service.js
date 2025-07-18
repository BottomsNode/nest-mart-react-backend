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
exports.SaleService = void 0;
const common_1 = require("@nestjs/common");
const sales_repository_1 = require("./repository/sales.repository");
const nestjs_1 = require("@automapper/nestjs");
const response_sales_dto_1 = require("./dto/sales/response-sales.dto");
const main_sales_dto_1 = require("./dto/sales/main-sales.dto");
const sales_entity_1 = require("./entities/sales/sales.entity");
const common_2 = require("../../common");
const sale_item_entity_1 = require("./entities/items/sale-item.entity");
const product_repository_1 = require("../product/repository/product.repository");
const create_salesItem_dto_1 = require("./dto/items/create-salesItem.dto");
const user_repository_1 = require("../user/repository/user.repository");
let SaleService = class SaleService {
    salesRepo;
    productRepo;
    userRepo;
    mapper;
    constructor(salesRepo, productRepo, userRepo, mapper) {
        this.salesRepo = salesRepo;
        this.productRepo = productRepo;
        this.userRepo = userRepo;
        this.mapper = mapper;
    }
    async create(dto) {
        const totalAmount = dto.items.reduce((sum, item) => sum + item.quantity * item.priceAtPurchase, 0);
        const saleEntity = new sales_entity_1.SaleEntity();
        saleEntity.totalAmount = totalAmount;
        saleEntity.customer = { id: dto.customerId };
        const saleItemEntities = [];
        for (const item of dto.items) {
            const product = await this.productRepo.findOne({
                where: { id: item.id },
            });
            if (!product)
                throw new common_2.CustomNotFoundException(`Product with ID ${item.id} not found in stock.`);
            if (product.stock < item.quantity)
                throw new common_2.CustomNotFoundException(`Insufficient stock for product ID ${item.id}. Available: ${product.stock}, Requested: ${item.quantity}`);
            product.stock -= item.quantity;
            await this.productRepo.update(item.id, product);
            const saleItemEntity = this.mapper.map(item, create_salesItem_dto_1.CreateSaleItemDTO, sale_item_entity_1.SaleItemEntity);
            saleItemEntity.product = product;
            saleItemEntities.push(saleItemEntity);
        }
        saleEntity.items = saleItemEntities;
        const savedSale = await this.salesRepo.create(saleEntity);
        return this.mapper.map(savedSale, sales_entity_1.SaleEntity, response_sales_dto_1.SaleResponseDTO);
    }
    async getAllSales() {
        const sales = await this.salesRepo.getAllSalesWithDetails();
        if (!sales || sales.length === 0)
            throw new common_2.CustomNotFoundException('No Sales Yet..!');
        const mainList = this.mapper.mapArray(sales, sales_entity_1.SaleEntity, main_sales_dto_1.SaleDTO);
        return mainList;
    }
    async getSalesByCustomerEmail(email) {
        const customer = await this.userRepo.findByEmail(email);
        if (!customer) {
            throw new common_2.CustomNotFoundException(`Customer with email ${email} not found`);
        }
        const sales = await this.salesRepo.find({
            where: { customer: { id: customer.id } },
            relations: ['customer', 'items'],
        });
        if (!sales || sales.length === 0) {
            throw new common_2.CustomNotFoundException(`No sales found for customer with email ${email}`);
        }
        return sales.map(sale => {
            const main = this.mapper.map(sale, sales_entity_1.SaleEntity, main_sales_dto_1.SaleDTO);
            return this.mapper.map(main, main_sales_dto_1.SaleDTO, response_sales_dto_1.SaleResponseDTO);
        });
    }
    async updateSale(params, dto) {
        const sale = await this.salesRepo.findOne({ where: { id: params.Id } });
        if (!sale) {
            throw new common_2.CustomNotFoundException(`Sale with ID ${params.Id} not found`);
        }
        Object.assign(sale, dto);
        const saved = await this.salesRepo.update(params.Id, sale);
        const main = this.mapper.map(saved, sales_entity_1.SaleEntity, main_sales_dto_1.SaleDTO);
        return this.mapper.map(main, main_sales_dto_1.SaleDTO, response_sales_dto_1.SaleResponseDTO);
    }
    async deleteSale(params) {
        const sales = await this.salesRepo.findOne({ where: { id: params.Id } });
        if (!sales)
            throw new common_2.CustomNotFoundException(`Product with ID ${params.Id} not found`);
        await this.salesRepo.delete(params.Id);
    }
};
exports.SaleService = SaleService;
exports.SaleService = SaleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SalesRepository')),
    __param(1, (0, common_1.Inject)('ProductRepository')),
    __param(2, (0, common_1.Inject)('UserRepository')),
    __param(3, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [sales_repository_1.SalesRepository,
        product_repository_1.ProductRepository,
        user_repository_1.UserRepository, Object])
], SaleService);
//# sourceMappingURL=sale.service.js.map
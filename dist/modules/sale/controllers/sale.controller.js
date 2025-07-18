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
exports.SaleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const sale_service_1 = require("../sale.service");
const common_2 = require("../../../common");
const create_sales_dto_1 = require("../dto/sales/create-sales.dto");
const update_sales_dto_1 = require("../dto/sales/update-sales.dto");
const permissions_guard_1 = require("../../auth/guards/permissions.guard");
let SaleController = class SaleController {
    saleService;
    constructor(saleService) {
        this.saleService = saleService;
    }
    async create(dto) {
        return this.saleService.create(dto);
    }
    async getAll() {
        return this.saleService.getAllSales();
    }
    async getSalesByCustomerEmail(email) {
        return this.saleService.getSalesByCustomerEmail(email);
    }
    async update(params, dto) {
        return this.saleService.updateSale(params, dto);
    }
    async delete(params) {
        return this.saleService.deleteSale(params);
    }
};
exports.SaleController = SaleController;
__decorate([
    (0, common_1.Post)(),
    (0, common_2.Permissions)('CREATE_SALES'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sales_dto_1.CreateSaleDTO]),
    __metadata("design:returntype", Promise)
], SaleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_2.Permissions)('VIEW_SALES'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SaleController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('by-customer-email/:email'),
    (0, common_2.Permissions)('VIEW_OWN_SALES'),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No sales found for this customer' }),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SaleController.prototype, "getSalesByCustomerEmail", null);
__decorate([
    (0, common_1.Put)(':Id'),
    (0, common_2.Permissions)('VIEW_SALES'),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Sale not found' }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.IdParamDto,
        update_sales_dto_1.UpdateSaleDTO]),
    __metadata("design:returntype", Promise)
], SaleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':Id'),
    (0, common_2.Permissions)('DELETE_PRODUCTS'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.IdParamDto]),
    __metadata("design:returntype", Promise)
], SaleController.prototype, "delete", null);
exports.SaleController = SaleController = __decorate([
    (0, swagger_1.ApiTags)('Sales'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('sale'),
    __metadata("design:paramtypes", [sale_service_1.SaleService])
], SaleController);
//# sourceMappingURL=sale.controller.js.map
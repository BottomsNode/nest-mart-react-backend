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
exports.SaleItemController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../../../common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const update_salesItem_dto_1 = require("../dto/items/update-salesItem.dto");
const saleItem_service_1 = require("../saleItem.service");
const permissions_guard_1 = require("../../auth/guards/permissions.guard");
let SaleItemController = class SaleItemController {
    saleItemService;
    constructor(saleItemService) {
        this.saleItemService = saleItemService;
    }
    async getAll() {
        return this.saleItemService.getAllSaleItems();
    }
    async getOne(params) {
        return this.saleItemService.getSaleItemById(params);
    }
    async update(params, dto) {
        return this.saleItemService.updateSaleItem(params, dto);
    }
    async delete(params) {
        return this.saleItemService.deleteSaleItem(params);
    }
};
exports.SaleItemController = SaleItemController;
__decorate([
    (0, common_1.Get)(),
    (0, common_2.Permissions)('VIEW_SALES'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SaleItemController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':Id'),
    (0, common_2.Permissions)('VIEW_SALES'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.IdParamDto]),
    __metadata("design:returntype", Promise)
], SaleItemController.prototype, "getOne", null);
__decorate([
    (0, common_1.Put)(':Id'),
    (0, common_2.Permissions)('VIEW_SALES'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a sale item (ADMIN only)' }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.IdParamDto,
        update_salesItem_dto_1.UpdateSaleItemDTO]),
    __metadata("design:returntype", Promise)
], SaleItemController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':Id'),
    (0, common_2.Permissions)('DELETE_PRODUCTS'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a sale item (ADMIN only)' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.IdParamDto]),
    __metadata("design:returntype", Promise)
], SaleItemController.prototype, "delete", null);
exports.SaleItemController = SaleItemController = __decorate([
    (0, swagger_1.ApiTags)('Sale Items'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionGuard),
    (0, common_1.Controller)('sale-item'),
    __metadata("design:paramtypes", [saleItem_service_1.SaleItemService])
], SaleItemController);
//# sourceMappingURL=saleItem.controller.js.map
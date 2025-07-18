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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const common_2 = require("../../common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const permissions_guard_1 = require("../auth/guards/permissions.guard");
let ProductController = class ProductController {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    create(dto) {
        return this.productService.create(dto);
    }
    getAll(pagnation) {
        return this.productService.getAll(pagnation);
    }
    getOne(params) {
        return this.productService.getOne(params);
    }
    getActiveProducts(pagination) {
        return this.productService.getActiveProducts(pagination);
    }
    getDeactiveProducts(pagination) {
        return this.productService.getDeactiveProducts(pagination);
    }
    searchProducts(term) {
        return this.productService.searchByName(term);
    }
    update(params, dto) {
        return this.productService.update(params, dto);
    }
    updateStock(params, stock) {
        return this.productService.updateStock(params, stock);
    }
    activateProduct(params) {
        console.log(params);
        return this.productService.setStatus(params, common_2.PRODUCT_STATUS.ACTIVE);
    }
    deactivateProduct(params) {
        console.log(params);
        return this.productService.setStatus(params, common_2.PRODUCT_STATUS.INACTIVE);
    }
    delete(params) {
        return this.productService.delete(params);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Post)(),
    (0, common_2.Permissions)('MANAGE_PRODUCTS'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new product (ADMIN only)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDTO]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_2.Permissions)('VIEW_PRODUCTS'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.PaginationRequestDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':Id'),
    (0, common_2.Permissions)('VIEW_PRODUCTS'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.IdParamDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)('/list/active'),
    (0, common_2.Permissions)('MANAGE_PRODUCTS'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.PaginationRequestDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getActiveProducts", null);
__decorate([
    (0, common_1.Get)('/list/deactivate'),
    (0, common_2.Permissions)('MANAGE_PRODUCTS'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.PaginationRequestDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getDeactiveProducts", null);
__decorate([
    (0, common_1.Get)('search/:term'),
    (0, common_2.Permissions)('VIEW_PRODUCTS'),
    __param(0, (0, common_1.Param)('term')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "searchProducts", null);
__decorate([
    (0, common_1.Put)(':Id'),
    (0, common_2.Permissions)('MANAGE_PRODUCTS'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.IdParamDto,
        update_product_dto_1.UpdateProductDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':Id/:stock'),
    (0, common_2.Permissions)('UPDATE_STOCKS'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.IdParamDto,
        common_2.StockDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateStock", null);
__decorate([
    (0, common_1.Put)(':Id/activate/my/prod'),
    (0, common_2.Permissions)('MANAGE_PRODUCTS'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.IdParamDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "activateProduct", null);
__decorate([
    (0, common_1.Put)(':Id/deactivate/prod'),
    (0, common_2.Permissions)('MANAGE_PRODUCTS'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.IdParamDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deactivateProduct", null);
__decorate([
    (0, common_1.Delete)(':Id'),
    (0, common_2.Permissions)('DELETE_PRODUCTS'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.IdParamDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)('Products'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionGuard),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map
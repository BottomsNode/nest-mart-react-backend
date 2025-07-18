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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleItemResponseDTO = void 0;
const response_product_dto_1 = require("../../../product/dto/response-product.dto");
const common_1 = require("../../../../common");
const classes_1 = require("@automapper/classes");
const swagger_1 = require("@nestjs/swagger");
class SaleItemResponseDTO extends common_1.ResponseCommonDto {
    product;
    quantity;
    priceAtPurchase;
}
exports.SaleItemResponseDTO = SaleItemResponseDTO;
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", response_product_dto_1.ProductResponseDTO)
], SaleItemResponseDTO.prototype, "product", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SaleItemResponseDTO.prototype, "quantity", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SaleItemResponseDTO.prototype, "priceAtPurchase", void 0);
//# sourceMappingURL=response-salesItem.dto.js.map
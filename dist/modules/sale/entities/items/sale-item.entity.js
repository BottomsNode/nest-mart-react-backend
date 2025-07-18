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
exports.SaleItemEntity = void 0;
const product_entity_1 = require("../../../product/entities/product.entity");
const typeorm_1 = require("typeorm");
const common_1 = require("../../../../common");
const sales_entity_1 = require("../sales/sales.entity");
const classes_1 = require("@automapper/classes");
let SaleItemEntity = class SaleItemEntity extends common_1.MyBaseEntity {
    sale;
    product;
    quantity;
    priceAtPurchase;
};
exports.SaleItemEntity = SaleItemEntity;
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.ManyToOne)(() => sales_entity_1.SaleEntity, (sale) => sale.items),
    __metadata("design:type", sales_entity_1.SaleEntity)
], SaleItemEntity.prototype, "sale", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, (product) => product.saleItems),
    __metadata("design:type", product_entity_1.ProductEntity)
], SaleItemEntity.prototype, "product", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SaleItemEntity.prototype, "quantity", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], SaleItemEntity.prototype, "priceAtPurchase", void 0);
exports.SaleItemEntity = SaleItemEntity = __decorate([
    (0, typeorm_1.Entity)()
], SaleItemEntity);
//# sourceMappingURL=sale-item.entity.js.map
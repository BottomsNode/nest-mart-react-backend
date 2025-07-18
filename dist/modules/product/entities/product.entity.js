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
exports.ProductEntity = void 0;
const classes_1 = require("@automapper/classes");
const common_1 = require("../../../common");
const constants_1 = require("../../../common/constants");
const sale_item_entity_1 = require("../../sale/entities/items/sale-item.entity");
const typeorm_1 = require("typeorm");
let ProductEntity = class ProductEntity extends common_1.MyBaseEntity {
    name;
    price;
    stock;
    status;
    saleItems;
};
exports.ProductEntity = ProductEntity;
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductEntity.prototype, "name", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "price", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ default: 15 }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "stock", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enumName: 'product_status_enum',
        enum: constants_1.PRODUCT_STATUS,
        default: constants_1.PRODUCT_STATUS.ACTIVE,
    }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "status", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.OneToMany)(() => sale_item_entity_1.SaleItemEntity, (item) => item.product),
    __metadata("design:type", Array)
], ProductEntity.prototype, "saleItems", void 0);
exports.ProductEntity = ProductEntity = __decorate([
    (0, typeorm_1.Entity)()
], ProductEntity);
//# sourceMappingURL=product.entity.js.map
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
exports.SaleEntity = void 0;
const common_1 = require("../../../../common");
const user_entity_1 = require("../../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
const sale_item_entity_1 = require("../items/sale-item.entity");
const classes_1 = require("@automapper/classes");
let SaleEntity = class SaleEntity extends common_1.MyBaseEntity {
    saleDate;
    totalAmount;
    customer;
    items;
};
exports.SaleEntity = SaleEntity;
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], SaleEntity.prototype, "saleDate", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], SaleEntity.prototype, "totalAmount", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.CustomerEntity, (customer) => customer.sales, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", user_entity_1.CustomerEntity)
], SaleEntity.prototype, "customer", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.OneToMany)(() => sale_item_entity_1.SaleItemEntity, (item) => item.sale, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], SaleEntity.prototype, "items", void 0);
exports.SaleEntity = SaleEntity = __decorate([
    (0, typeorm_1.Entity)()
], SaleEntity);
//# sourceMappingURL=sales.entity.js.map
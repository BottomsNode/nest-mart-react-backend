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
exports.CustomerEntity = void 0;
const classes_1 = require("@automapper/classes");
const common_1 = require("../../../common");
const address_entity_1 = require("../../address/entities/address.entity");
const role_entity_1 = require("../../auth/entities/role.entity");
const sales_entity_1 = require("../../sale/entities/sales/sales.entity");
const typeorm_1 = require("typeorm");
let CustomerEntity = class CustomerEntity extends common_1.MyBaseEntity {
    name;
    phone;
    email;
    password;
    isActive;
    role;
    address;
    sales;
};
exports.CustomerEntity = CustomerEntity;
__decorate([
    (0, typeorm_1.Column)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CustomerEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CustomerEntity.prototype, "phone", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], CustomerEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CustomerEntity.prototype, "password", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], CustomerEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.RolesEntity, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", role_entity_1.RolesEntity)
], CustomerEntity.prototype, "role", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.OneToOne)(() => address_entity_1.AddressEntity, (address) => address.customer, {
        cascade: true,
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", address_entity_1.AddressEntity)
], CustomerEntity.prototype, "address", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.OneToMany)(() => sales_entity_1.SaleEntity, (sale) => sale.customer),
    __metadata("design:type", Array)
], CustomerEntity.prototype, "sales", void 0);
exports.CustomerEntity = CustomerEntity = __decorate([
    (0, typeorm_1.Entity)()
], CustomerEntity);
//# sourceMappingURL=user.entity.js.map
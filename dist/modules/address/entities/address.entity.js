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
exports.AddressEntity = void 0;
const classes_1 = require("@automapper/classes");
const common_1 = require("../../../common");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let AddressEntity = class AddressEntity extends common_1.MyBaseEntity {
    street;
    city;
    pincode;
    customer;
};
exports.AddressEntity = AddressEntity;
__decorate([
    (0, typeorm_1.Column)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], AddressEntity.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], AddressEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], AddressEntity.prototype, "pincode", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.OneToOne)(() => user_entity_1.CustomerEntity, (customer) => customer.address),
    __metadata("design:type", user_entity_1.CustomerEntity)
], AddressEntity.prototype, "customer", void 0);
exports.AddressEntity = AddressEntity = __decorate([
    (0, typeorm_1.Entity)()
], AddressEntity);
//# sourceMappingURL=address.entity.js.map
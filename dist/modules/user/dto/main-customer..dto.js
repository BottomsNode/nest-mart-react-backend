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
exports.CustomerMainDTO = void 0;
const main_address_dto_1 = require("../../address/dto/main-address.dto");
const classes_1 = require("@automapper/classes");
const swagger_1 = require("@nestjs/swagger");
const role_entity_1 = require("../../auth/entities/role.entity");
class CustomerMainDTO {
    id;
    name;
    phone;
    createdAt;
    email;
    password;
    isActive;
    role;
    address;
    sales;
}
exports.CustomerMainDTO = CustomerMainDTO;
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CustomerMainDTO.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CustomerMainDTO.prototype, "name", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CustomerMainDTO.prototype, "phone", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CustomerMainDTO.prototype, "createdAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CustomerMainDTO.prototype, "email", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CustomerMainDTO.prototype, "password", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CustomerMainDTO.prototype, "isActive", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", role_entity_1.RolesEntity)
], CustomerMainDTO.prototype, "role", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", main_address_dto_1.AddressMainDTO)
], CustomerMainDTO.prototype, "address", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], CustomerMainDTO.prototype, "sales", void 0);
//# sourceMappingURL=main-customer..dto.js.map
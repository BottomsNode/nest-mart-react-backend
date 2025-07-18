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
exports.CreateCustomerDTO = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const create_address_dto_1 = require("../../address/dto/create-address.dto");
const classes_1 = require("@automapper/classes");
class CreateCustomerDTO {
    name;
    phone;
    email;
    password;
    isActive;
    roleId;
    address;
}
exports.CreateCustomerDTO = CreateCustomerDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCustomerDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCustomerDTO.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateCustomerDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCustomerDTO.prototype, "password", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCustomerDTO.prototype, "isActive", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CreateCustomerDTO.prototype, "roleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: () => create_address_dto_1.CreateAddressDTO }),
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_address_dto_1.CreateAddressDTO),
    __metadata("design:type", create_address_dto_1.CreateAddressDTO)
], CreateCustomerDTO.prototype, "address", void 0);
//# sourceMappingURL=create-customer.dto.js.map
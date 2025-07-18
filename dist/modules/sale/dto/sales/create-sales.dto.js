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
exports.CreateSaleDTO = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_salesItem_dto_1 = require("../items/create-salesItem.dto");
const classes_1 = require("@automapper/classes");
const swagger_1 = require("@nestjs/swagger");
class CreateSaleDTO {
    totalAmount;
    customerId;
    items;
}
exports.CreateSaleDTO = CreateSaleDTO;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], CreateSaleDTO.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], CreateSaleDTO.prototype, "customerId", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)({ type: [create_salesItem_dto_1.CreateSaleItemDTO] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_salesItem_dto_1.CreateSaleItemDTO),
    __metadata("design:type", Array)
], CreateSaleDTO.prototype, "items", void 0);
//# sourceMappingURL=create-sales.dto.js.map
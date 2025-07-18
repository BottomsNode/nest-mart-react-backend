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
exports.RolesEntity = void 0;
const classes_1 = require("@automapper/classes");
const common_1 = require("../../../common");
const typeorm_1 = require("typeorm");
const permission_entity_1 = require("./permission.entity");
let RolesEntity = class RolesEntity extends common_1.MyBaseEntity {
    name;
    permissions;
};
exports.RolesEntity = RolesEntity;
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], RolesEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => permission_entity_1.PermissionsEntity, {
        eager: true,
        cascade: true,
        nullable: false,
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], RolesEntity.prototype, "permissions", void 0);
exports.RolesEntity = RolesEntity = __decorate([
    (0, typeorm_1.Entity)('roles')
], RolesEntity);
//# sourceMappingURL=role.entity.js.map
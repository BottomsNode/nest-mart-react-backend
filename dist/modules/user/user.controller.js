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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("./user.service");
const common_2 = require("../../common");
const create_customer_dto_1 = require("./dto/create-customer.dto");
const update_customer_dto_1 = require("./dto/update-customer.dto");
const patch_email_dto_1 = require("./dto/patch/patch-email.dto");
const patch_password_dto_1 = require("./dto/patch/patch-password.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const patch_address_dto_1 = require("../address/dto/patch/patch-address.dto");
const permissions_guard_1 = require("../auth/guards/permissions.guard");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async createCustomer(body) {
        return this.userService.create(body);
    }
    async getAllCustomer() {
        return this.userService.getAllUsers();
    }
    async getCustomer(params) {
        return this.userService.getUser(params);
    }
    async updateCustomer(params, body) {
        return this.userService.updateUser(params, body);
    }
    async deleteCustomer(params) {
        return this.userService.deleteUser(params);
    }
    searchProducts(term) {
        return this.userService.searchByName(term);
    }
    async activateUser(params) {
        return this.userService.setActiveStatus(params, true);
    }
    async deactivateUser(params) {
        return this.userService.setActiveStatus(params, false);
    }
    getActiveUsers(pagination) {
        return this.userService.getActiveCustomers(pagination);
    }
    getDeactiveUsers(pagination) {
        return this.userService.getDeactiveCustomers(pagination);
    }
    async updateUserPassword(body) {
        return this.userService.updatePassword(body.email, body.password);
    }
    async updateUserEmail(params, body) {
        return this.userService.updateEmail(params, body.email);
    }
    async updateAddress(params, dto) {
        return this.userService.updateUserAddress(params, dto);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionGuard),
    (0, common_2.Permissions)('MANAGE_USERS'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user (Only Admin Can)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_dto_1.CreateCustomerDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createCustomer", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionGuard),
    (0, common_2.Permissions)('VIEW_USERS'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllCustomer", null);
__decorate([
    (0, common_1.Get)(':Id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionGuard),
    (0, common_2.Permissions)('VIEW_USERS'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user by ID (Only Admin/Manager Can)' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.IdParamDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCustomer", null);
__decorate([
    (0, common_1.Put)(':Id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionGuard),
    (0, common_2.Permissions)('UPDATE_SELF'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update user data by ID (Only Admin/Manager/User Can)',
    }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.IdParamDto,
        update_customer_dto_1.UpdateCustomerDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateCustomer", null);
__decorate([
    (0, common_1.Delete)(':Id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionGuard),
    (0, common_2.Permissions)('MANAGE_USERS'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete user by ID (Only Admin Can)' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.IdParamDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteCustomer", null);
__decorate([
    (0, common_1.Get)('search/:term'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionGuard),
    (0, common_2.Permissions)('VIEW_USERS'),
    (0, swagger_1.ApiOperation)({
        summary: 'Search user by name (partial match) (Only Admin/Manager Can)',
    }),
    __param(0, (0, common_1.Param)('term')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "searchProducts", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Put)(':Id/activate'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionGuard),
    (0, common_2.Permissions)('MANAGE_USERS'),
    (0, swagger_1.ApiOperation)({ summary: 'Activate user account (Only Admin Can)' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.IdParamDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "activateUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Put)(':Id/deactivate'),
    (0, common_2.Permissions)('MANAGE_USERS'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionGuard),
    (0, common_2.Permissions)(),
    (0, swagger_1.ApiOperation)({ summary: 'Deactivate user account (Only Admin Can)' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.IdParamDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deactivateUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/list/active/users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionGuard),
    (0, common_2.Permissions)('MANAGE_USERS'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active customer list (Only Admin Can)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.PaginationRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getActiveUsers", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/list/deactivate/users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionGuard),
    (0, common_2.Permissions)('MANAGE_USERS'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all Deactive customer list (Only Admin Can)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.PaginationRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getDeactiveUsers", null);
__decorate([
    (0, common_1.Put)('password/reset'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user password (by email)' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [patch_password_dto_1.PatchPasswordDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserPassword", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Put)(':Id/email'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionGuard),
    (0, common_2.Permissions)('UPDATE_SELF'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user email (Only Admin/Manager/User Can)' }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.IdParamDto,
        patch_email_dto_1.PatchEmailDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserEmail", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Put)(':Id/address'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionGuard),
    (0, common_2.Permissions)('UPDATE_SELF'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update user address (Only Admin/Manager/User Can)',
    }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.IdParamDto,
        patch_address_dto_1.PatchAddressDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateAddress", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('Users → (Customers/Admin)'),
    (0, common_1.Controller)('user'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map
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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const unauthorized_exception_1 = require("../../common/exception/unauthorized.exception");
let AuthService = class AuthService {
    userService;
    jwtService;
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.userService.findByEmail(email);
        if (user &&
            user.isActive &&
            (await bcrypt.compare(password, user.password))) {
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                role: {
                    name: user.role.name,
                    permissions: user.role.permissions.map((p) => p.name),
                },
            };
        }
        throw new unauthorized_exception_1.CustomUnauthorizedException(user && !user.isActive
            ? 'Account is deactivated. Please contact support.'
            : 'Invalid credentials');
    }
    async login(body) {
        const user = await this.validateUser(body.email, body.password);
        const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role.name,
            permissions: user.role.permissions,
        };
        const token = this.jwtService.sign(payload);
        return token;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
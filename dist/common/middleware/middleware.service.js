"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const dotenv = require("dotenv");
dotenv.config({ path: '../.env' });
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const common_2 = require("..");
let AuthMiddleware = class AuthMiddleware {
    use(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_2.CustomUnauthorizedException('Unauthorized');
        }
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, common_2.jwtSecret);
            req['user'] = decoded;
            next();
        }
        catch {
            throw new common_2.CustomBadGatewayException('Invalid token');
        }
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)()
], AuthMiddleware);
//# sourceMappingURL=middleware.service.js.map
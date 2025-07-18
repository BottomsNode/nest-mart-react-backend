"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomUnauthorizedException = void 0;
const common_1 = require("@nestjs/common");
const base_exception_1 = require("./base/base.exception");
class CustomUnauthorizedException extends base_exception_1.BaseException {
    constructor(resource) {
        super(`${resource}`, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.CustomUnauthorizedException = CustomUnauthorizedException;
//# sourceMappingURL=unauthorized.exception.js.map
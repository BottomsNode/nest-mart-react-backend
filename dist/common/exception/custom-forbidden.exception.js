"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomForbiddenException = void 0;
const common_1 = require("@nestjs/common");
const base_exception_1 = require("./base/base.exception");
class CustomForbiddenException extends base_exception_1.BaseException {
    constructor(resource) {
        super(`${resource}`, common_1.HttpStatus.FORBIDDEN);
    }
}
exports.CustomForbiddenException = CustomForbiddenException;
//# sourceMappingURL=custom-forbidden.exception.js.map
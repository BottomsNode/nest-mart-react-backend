"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomConflictException = void 0;
const common_1 = require("@nestjs/common");
const base_exception_1 = require("./base/base.exception");
class CustomConflictException extends base_exception_1.BaseException {
    constructor(resource) {
        super(`${resource} already exists`, common_1.HttpStatus.CONFLICT);
    }
}
exports.CustomConflictException = CustomConflictException;
//# sourceMappingURL=conflict.exception.js.map
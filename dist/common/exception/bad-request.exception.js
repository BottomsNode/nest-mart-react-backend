"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomBadRequestException = void 0;
const common_1 = require("@nestjs/common");
const base_exception_1 = require("./base/base.exception");
class CustomBadRequestException extends base_exception_1.BaseException {
    constructor(message) {
        super(message, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.CustomBadRequestException = CustomBadRequestException;
//# sourceMappingURL=bad-request.exception.js.map
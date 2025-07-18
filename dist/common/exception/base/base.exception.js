"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseException = void 0;
const common_1 = require("@nestjs/common");
class BaseException extends common_1.HttpException {
    constructor(message, status) {
        super({ message, statusCode: status }, status);
    }
}
exports.BaseException = BaseException;
//# sourceMappingURL=base.exception.js.map
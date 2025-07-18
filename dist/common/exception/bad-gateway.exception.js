"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomBadGatewayException = void 0;
const common_1 = require("@nestjs/common");
const base_exception_1 = require("./base/base.exception");
class CustomBadGatewayException extends base_exception_1.BaseException {
    constructor(message) {
        super(message, common_1.HttpStatus.BAD_GATEWAY);
    }
}
exports.CustomBadGatewayException = CustomBadGatewayException;
//# sourceMappingURL=bad-gateway.exception.js.map
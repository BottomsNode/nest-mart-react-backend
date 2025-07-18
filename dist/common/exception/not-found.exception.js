"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomNotFoundException = void 0;
const common_1 = require("@nestjs/common");
const base_exception_1 = require("./base/base.exception");
class CustomNotFoundException extends base_exception_1.BaseException {
    constructor(resource) {
        super(`${resource} not found`, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.CustomNotFoundException = CustomNotFoundException;
//# sourceMappingURL=not-found.exception.js.map
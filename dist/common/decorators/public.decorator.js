"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = void 0;
const common_1 = require("@nestjs/common");
const secrets_1 = require("../secrets");
const Public = () => (0, common_1.SetMetadata)(secrets_1.PUBLIC_KEY, true);
exports.Public = Public;
//# sourceMappingURL=public.decorator.js.map
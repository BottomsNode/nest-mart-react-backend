"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSaleDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_sales_dto_1 = require("./create-sales.dto");
class UpdateSaleDTO extends (0, mapped_types_1.PartialType)(create_sales_dto_1.CreateSaleDTO) {
}
exports.UpdateSaleDTO = UpdateSaleDTO;
//# sourceMappingURL=update-sales.dto.js.map
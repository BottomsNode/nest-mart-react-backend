"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSaleItemDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_salesItem_dto_1 = require("./create-salesItem.dto");
class UpdateSaleItemDTO extends (0, mapped_types_1.PartialType)(create_salesItem_dto_1.CreateSaleItemDTO) {
}
exports.UpdateSaleItemDTO = UpdateSaleItemDTO;
//# sourceMappingURL=update-salesItem.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAddressDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_address_dto_1 = require("./create-address.dto");
class UpdateAddressDTO extends (0, mapped_types_1.PartialType)(create_address_dto_1.CreateAddressDTO) {
}
exports.UpdateAddressDTO = UpdateAddressDTO;
//# sourceMappingURL=update-address.dto.js.map
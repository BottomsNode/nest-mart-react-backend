"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiFilesUploadDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const common_1 = require("../../../common");
class MultiFilesUploadDto {
    files;
}
exports.MultiFilesUploadDto = MultiFilesUploadDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'A file or files to upload',
        type: 'string',
        format: 'binary',
        isArray: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, common_1.MaxFileSize)(common_1.MAX_PROFILE_PICTURE_SIZE_IN_BYTES, { message: 'File size must not exceed 5MB' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], MultiFilesUploadDto.prototype, "files", void 0);
//# sourceMappingURL=multi-file-upload.dto.js.map
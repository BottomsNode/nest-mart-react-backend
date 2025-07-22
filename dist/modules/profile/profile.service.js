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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const cloudinary_1 = require("cloudinary");
let ProfileService = class ProfileService {
    uploadDir = './uploads';
    constructor() {
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir);
        }
        cloudinary_1.v2.config({
            cloud_name: 'dmlai0dwy',
            api_key: '889616663176843',
            api_secret: '-abn8Y-dhbcbOfyVwRYW-sITbLM',
        });
    }
    async saveFile(file) {
        const fileName = `${Date.now()}_${file.originalname}`;
        const filePath = path.join(this.uploadDir, fileName);
        try {
            fs.writeFileSync(filePath, file.buffer);
        }
        catch (error) {
            throw new Error('Failed to save file');
        }
        return fileName;
    }
    async getUploadSignature(folder = 'invoices') {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = cloudinary_1.v2.utils.api_sign_request({
            timestamp,
            folder,
        }, cloudinary_1.v2.config().api_secret);
        return {
            timestamp,
            signature,
            apiKey: cloudinary_1.v2.config().api_key,
            cloudName: cloudinary_1.v2.config().cloud_name,
            folder,
        };
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ProfileService);
//# sourceMappingURL=profile.service.js.map
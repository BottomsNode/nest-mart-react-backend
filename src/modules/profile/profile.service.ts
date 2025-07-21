import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import fetch from 'node-fetch';
import * as FormData from 'form-data';
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from 'src/common';

type CloudinaryUploadResponse = {
    asset_id: string;
    public_id: string;
    version: number;
    version_id: string;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    tags: string[];
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    original_filename: string;
};

@Injectable()
export class ProfileService {
    private readonly uploadDir = './uploads';

    constructor() {
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir);
        }

        cloudinary.config({
            cloud_name: 'dmlai0dwy',
            api_key: '889616663176843',
            api_secret: '-abn8Y-dhbcbOfyVwRYW-sITbLM',
        });
    }

    async saveFile(file): Promise<string> {
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

        const signature = cloudinary.utils.api_sign_request(
            {
                timestamp,
                folder,
            },
            cloudinary.config().api_secret as string,
        );

        return {
            timestamp,
            signature,
            apiKey: cloudinary.config().api_key,
            cloudName: cloudinary.config().cloud_name,
            folder,
        };
    }
}

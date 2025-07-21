import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import fetch from 'node-fetch';
import * as FormData from 'form-data';
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

    async uploadToCloudinary(file: Express.Multer.File) {
        const formData = new FormData();
        formData.append('file', file.buffer, { filename: file.originalname });
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
            {
                method: 'POST',
                body: formData as any,
            },
        );

        if (!response.ok) {
            throw new Error(`Cloudinary upload failed: ${response.statusText}`);
        }

        const data = await response.json() as CloudinaryUploadResponse;

        return {
            url: data.secure_url,
            publicId: data.public_id,
        };
    }
}

import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v2 as cloudinary } from 'cloudinary';

interface CloudinaryUploadResponse {
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
}
export interface UploadType {
  timestamp: number;
  signature: string;
  apiKey: string;
  cloudName: string;
  folder: string;
}
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

  async saveFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${Date.now()}_${file.originalname}`;
    const filePath = path.join(this.uploadDir, fileName);
    try {
      await fs.promises.writeFile(filePath, file.buffer);
    } catch {
      throw new Error('Failed to save file');
    }
    return fileName;
  }

  getUploadSignature(folder = 'invoices'): UploadType {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
      },
      cloudinary.config().api_secret,
    );

    return {
      timestamp,
      signature,
      apiKey: cloudinary.config().api_key,
      cloudName: cloudinary.config().cloud_name,
      folder,
    };
  }

  async uploadToCloudinary(
    filePath: string,
  ): Promise<CloudinaryUploadResponse> {
    try {
      const uploadResponse = await cloudinary.uploader.upload(filePath, {
        folder: 'invoices',
      });

      return uploadResponse as unknown as CloudinaryUploadResponse;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to upload file to cloudinary: ${error.message}`,
        );
      }
      throw new Error('Failed to upload file to cloudinary');
    }
  }
}

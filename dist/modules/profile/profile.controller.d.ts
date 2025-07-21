import { ProfileService } from './profile.service';
export declare class ProfileController {
    private readonly service;
    constructor(service: ProfileService);
    uploadSingleFile(file: Express.Multer.File): Promise<{
        message: string;
        fileName: string;
        filePath: string;
    }>;
    uploadMultipleFiles(files: Array<Express.Multer.File>): Promise<{
        message: string;
        fileNames: string[];
        count: number;
    }>;
    uploadToCloudinary(file: Express.Multer.File): Promise<{
        url: string;
        publicId: string;
    }>;
}

export declare class ProfileService {
    private readonly uploadDir;
    constructor();
    saveFile(file: any): Promise<string>;
    uploadToCloudinary(file: Express.Multer.File): Promise<{
        url: string;
        publicId: string;
    }>;
}

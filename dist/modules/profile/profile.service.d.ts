export declare class ProfileService {
    private readonly uploadDir;
    constructor();
    saveFile(file: any): Promise<string>;
    getUploadSignature(folder?: string): Promise<{
        timestamp: number;
        signature: string;
        apiKey: string;
        cloudName: string;
        folder: string;
    }>;
}

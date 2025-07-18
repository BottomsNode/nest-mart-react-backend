import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

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
}

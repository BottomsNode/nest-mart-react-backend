import { Controller, Get, HttpStatus, ParseFilePipeBuilder, Post, Query, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MAX_PROFILE_PICTURE_SIZE_IN_BYTES } from 'src/common';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { MultiFilesUploadDto } from './dto/multi-file-upload.dto';
import { SingleFileUploadDto } from './dto/single-file-upload.dto';

@Controller('profile')
export class ProfileController {

  constructor(private readonly service: ProfileService) { }

  @Post('upload-single')
  @ApiOperation({ summary: 'Upload a single file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: SingleFileUploadDto })
  @UseInterceptors(FileInterceptor('file'))
  public async uploadSingleFile(@UploadedFile() file: Express.Multer.File) {
    const fileName = await this.service.saveFile(file);
    return {
      message: 'File uploaded successfully',
      fileName: fileName,
      filePath: `/uploads/${fileName}`,
    };
  }

  @Post('upload-multiple')
  @ApiOperation({ summary: 'Upload multiple files' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: MultiFilesUploadDto })
  @UseInterceptors(FilesInterceptor('files'))
  async uploadMultipleFiles(@UploadedFiles() files: Array<Express.Multer.File>): Promise<{ message: string; fileNames: string[]; count: number; }> {
    const fileNames = await Promise.all(files.map(file => this.service.saveFile(file)));
    return {
      message: 'Files uploaded successfully',
      fileNames,
      count: files.length,
    };
  }

  @Get('signature')
  getSignature(@Query('folder') folder?: string) {
    return this.service.getUploadSignature(folder);
  }
}

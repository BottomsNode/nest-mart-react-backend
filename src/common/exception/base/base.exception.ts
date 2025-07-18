import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super({ message, statusCode: status }, status);
  }
}

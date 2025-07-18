import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base/base.exception';

export class CustomBadRequestException extends BaseException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

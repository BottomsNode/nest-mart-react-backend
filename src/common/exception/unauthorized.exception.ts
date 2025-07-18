import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base/base.exception';

export class CustomUnauthorizedException extends BaseException {
  constructor(resource: string) {
    super(`${resource}`, HttpStatus.UNAUTHORIZED);
  }
}

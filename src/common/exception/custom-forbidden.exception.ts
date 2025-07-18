import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base/base.exception';

export class CustomForbiddenException extends BaseException {
  constructor(resource: string) {
    super(`${resource}`, HttpStatus.FORBIDDEN);
  }
}

import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base/base.exception';

export class CustomConflictException extends BaseException {
  constructor(resource: string) {
    super(`${resource} already exists`, HttpStatus.CONFLICT);
  }
}

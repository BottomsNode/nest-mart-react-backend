import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base/base.exception';

export class CustomNotFoundException extends BaseException {
  constructor(resource: string) {
    super(`${resource} Not Found`, HttpStatus.NOT_FOUND);
  }
}

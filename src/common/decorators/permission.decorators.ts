import { SetMetadata } from '@nestjs/common';
import { PERMISSION_KEY } from '../constants';

export const Permissions = (...permissions: string[]) =>
  SetMetadata(PERMISSION_KEY, permissions);

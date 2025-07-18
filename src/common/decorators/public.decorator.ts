import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from '../secrets';

export const Public = () => SetMetadata(PUBLIC_KEY, true);

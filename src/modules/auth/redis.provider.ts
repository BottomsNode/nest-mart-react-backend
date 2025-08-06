import Redis from 'ioredis';
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from 'src/common';

export const redisProvider = {
  provide: 'REDIS_CLIENT',
  useFactory: () => {
    return new Redis({
      host: REDIS_HOST,
      port: parseInt(REDIS_PORT, 10),
      password: REDIS_PASSWORD,
    });
  },
};

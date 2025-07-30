import { Injectable, Logger, Inject } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import Redis from 'ioredis';

@Injectable()
export class AuthCronService {
    private readonly logger = new Logger(AuthCronService.name);

    constructor(
        @Inject('REDIS_CLIENT') private readonly redisClient: Redis
    ) { }

    @Cron('0 0 * * *')
    async cleanExpiredTokens() {
        try {
            const keys = await this.redisClient.keys('user_token:*');

            for (const key of keys) {
                const ttl = await this.redisClient.ttl(key);

                if (ttl <= 0) {
                    this.logger.log(`Removing expired token: ${key}`);
                    await this.redisClient.del(key);
                }
            }
        } catch (err) {
            this.logger.error('Error during token cleanup', err);
        }
    }
}

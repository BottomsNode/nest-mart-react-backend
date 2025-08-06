import { Injectable, Logger, Inject } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import Redis from 'ioredis';
import { MailService } from 'src/modules/mail/mail.service';

@Injectable()
export class AuthCronService {
  private readonly logger = new Logger(AuthCronService.name);

  constructor(
    private readonly mailService: MailService,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  @Cron('0 0 * * *')
  async cleanExpiredTokens() {
    const timestamp = new Date().toLocaleString();
    this.logger.log(`Token cleanup started at ${timestamp}`);

    try {
      const keys = await this.redisClient.keys('user_token:*');
      const totalChecked = keys.length;
      let deletedCount = 0;

      for (const key of keys) {
        const ttl = await this.redisClient.ttl(key);

        if (ttl <= 0) {
          await this.redisClient.del(key);
          this.logger.log(`Removed expired token: ${key}`);
          deletedCount++;
        }
      }

      this.logger.log(
        `Cleanup complete. ${deletedCount} of ${totalChecked} tokens removed.`,
      );

      await this.mailService.sendTokenCleanupNotification(
        'nishit.shivdasani@esparkbizmail.com',
        totalChecked,
        deletedCount,
        timestamp,
      );
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error(
          `Error during token cleanup: ${err.message}`,
          err.stack,
        );
      } else {
        this.logger.error('Unknown error occurred during token cleanup.');
      }

      await this.mailService.sendTokenCleanupNotification(
        'nishit.shivdasani@esparkbizmail.com',
        0,
        0,
        timestamp + ' (Error occurred)',
      );
    }
  }
}

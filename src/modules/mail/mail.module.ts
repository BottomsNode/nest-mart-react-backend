import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { MailProcessor } from './mail.processor';
import { MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_SECURE, MAIL_USER } from 'src/common';
import { AuthCronService } from '../auth/cron-jobs';
import { redisProvider } from '../auth/redis.provider';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: MAIL_HOST,
                port: parseInt(MAIL_PORT, 10),
                secure: MAIL_SECURE === 'true',
                auth: {
                    user: MAIL_USER,
                    pass: MAIL_PASS,
                },
            },
            defaults: {
                from: `"Nest-Mart-Shop Admin" <${MAIL_USER}>`,
            },
        }),
    ],
    providers: [MailService, MailProcessor, redisProvider, AuthCronService],
    exports: [MailService, AuthCronService,redisProvider],
})
export class MailModule { }

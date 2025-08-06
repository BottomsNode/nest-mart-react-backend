import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailService } from './mail.service';

interface WelcomeEmailData {
  email: string;
  name: string;
  password: string;
}
@Processor('mail')
export class MailProcessor {
  constructor(private readonly mailService: MailService) {}

  @Process('send-user-welcome')
  async handleSendWelcome(job: Job<WelcomeEmailData>) {
    const { email, name, password } = job.data;
    try {
      await this.mailService.sendWelcomeEmail(email, name, password);
      console.log('Mail Send');
    } catch (error) {
      console.error(`[Queue] Failed to send email to ${email}:`, error);
    }
  }
}

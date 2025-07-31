import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CLIENT_URL, DB_HOST, PORT } from 'src/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

    async sendWelcomeEmail(email: string, name: string, password: string) {
        const logoUrl = `http://${process.env.DB_HOST}:${process.env.PORT}/public/img/logo.jpg`;
        const websiteUrl = `http://${CLIENT_URL}`;

        const currentYear = new Date().getFullYear();

        const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome Email</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding: 20px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            
            <!-- Header -->
            <tr style="background-color: #2f855a;">
              <td style="padding: 20px; text-align: center;">
                <img
                  src="${logoUrl}"
                  alt="Company Logo"
                  width="120"
                  style="display: block; margin: 0 auto;" />
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 30px;">
                <h2 style="color: #333;">Welcome, ${name}!</h2>
                <p style="color: #555;">
                  Your account has been created by the administrator. Below are your login credentials:
                </p>
                <table cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                  <tr>
                    <td style="padding: 5px 0; font-weight: bold;">Email:</td>
                    <td style="padding: 5px 10px;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; font-weight: bold;">Password:</td>
                    <td style="padding: 5px 10px;">${password}</td>
                  </tr>
                </table>
                <p style="color: #555;">Please login and change your password after logging in for security reasons.</p>
                <div style="margin-top: 30px; text-align: center;">
                  <a href="${websiteUrl}/login" style="display: inline-block; background-color: #2f855a; color: #fff; padding: 12px 20px; border-radius: 5px; text-decoration: none;">Login Now</a>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr style="background-color: #f1f1f1;">
              <td style="padding: 20px; text-align: center; color: #999; font-size: 12px;">
                &copy; ${currentYear} Your Company Name. All rights reserved.
                <br />
                <a href="${websiteUrl}" style="color: #2f855a; text-decoration: none;">Visit our website</a>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
    `;

        await this.mailerService.sendMail({
            to: email,
            subject: 'Welcome to Our Platform',
            html: htmlContent,
        });
    }
}

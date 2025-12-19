import { Injectable, Logger } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor() {
    if (!process.env.API_KEY) {
      throw new Error('SendGrid API_KEY is not defined');
    }

    sgMail.setApiKey(process.env.API_KEY);
  }

  async sendEmail(
    email: string,
    verificationCode: string,
    subject: string,
    text: string,
  ): Promise<boolean> {
    const message = {
      to: email,
      from: {
        name: 'Verification Code, AmitShop',
        email: 'edzaryan@gmail.com',
      },
      subject,
      text,
      html: `<div>Your verification code is: <strong>${verificationCode}</strong></div>`,
    };

    try {
      await sgMail.send(message);
      this.logger.log(`Email sent to ${email}`);
      return true;
    } catch (error) {
      this.logger.error('Error sending email', error);
      return false;
    }
  }
}
import { Injectable, Logger } from '@nestjs/common';
import sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor() {
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error('SendGrid API_KEY is not defined');
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  }

  async sendEmail(
    email: string,
    verificationCode: string,
    subject: string,
    text: string,
  ): Promise<boolean> {
    try {
      await sgMail.send({
        to: email,
        from: {
          name: 'Verification Code, MICROCENTER',
          email: 'melfox701@gmail.com',
        },
        subject,
        text: `Your verification code is ${verificationCode}`,
        html: `<div>Your verification code is: <strong>${verificationCode}</strong></div>`,
      });
      
      this.logger.log(`Email sent to ${email}`);
      return true;
    } catch (error) {
      this.logger.error('Error sending email', error);
      return false;
    }
  }
}
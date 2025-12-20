import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PasswordService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService
  ) {}

  private generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const verificationCode = this.generateVerificationCode();

    console.log(verificationCode);

    const token = jwt.sign(
      { email, verificationCode },
      process.env.TOKEN_SECRET_KEY!,
      { expiresIn: '15m' },
    );

    const sent = await this.mailService.sendEmail(
      email,
      verificationCode,
      'Password Reset Verification Code',
      `Your verification code is ${verificationCode}`,
    );

    if (!sent) {
      throw new Error('Failed to send email');
    }

    return token;
  }

  async verifyCode(token: string, code: string) {
    const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    if (decoded.code !== code) {
      throw new BadRequestException('Invalid code');
    }

    return jwt.sign(
      { email: decoded.email },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: '15m' },
    );
  }

  async changePassword(token: string, newPassword: string) {
    const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const hash = await bcrypt.hash(newPassword, 10);

    const user = await this.usersService.findByEmail(decoded.email);

    if (!user) {
    throw new BadRequestException('User not found');
    }

    user.password = hash;
    await user.save();

    return { success: true };
  }
}

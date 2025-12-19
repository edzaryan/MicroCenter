import { Injectable, BadRequestException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class PasswordService {
  constructor(private usersService: UsersService) {}

  async forgot(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException('User not found');

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const token = jwt.sign(
      { email, code },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: '15m' },
    );

    // send email here later
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

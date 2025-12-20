import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';

import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';

@Module({
  imports: [
    UsersModule,
    MailModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController, PasswordController],
  providers: [AuthService, PasswordService],
  exports: [AuthService],
})
export class AuthModule {}

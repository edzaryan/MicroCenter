import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { PasswordService } from './password.service';
import type { Request, Response } from 'express';

@Controller('password')
export class PasswordController {
  constructor(private passwordService: PasswordService) {}

  @Post('forgot')
  async forgot(@Body('email') email: string, @Res() res: Response) {
    const token = await this.passwordService.forgot(email);
    res.cookie('token', token, { httpOnly: true, secure: false });
    return res.json({ success: true });
  }

  @Post('verify')
  async verify(@Req() req: Request, @Body('code') code: string, @Res() res: Response) {
    const newToken = await this.passwordService.verifyCode(req.cookies.token, code);
    res.cookie('token', newToken, { httpOnly: true, secure: false });
    return res.json({ success: true });
  }

  @Post('change')
  async change(@Req() req: Request, @Body('password') password: string) {
    return this.passwordService.changePassword(req.cookies.token, password);
  }
}

import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  async signin(@Body() dto: SigninDto, @Res() res: Response) {
    const token = await this.authService.signin(dto);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // IMPORTANT FOR LOCALHOST
    });

    return res.json({
      success: true,
      token,
    });
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('token');
    return res.json({ success: true });
  }
}

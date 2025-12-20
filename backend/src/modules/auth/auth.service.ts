import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(dto: SignupDto) {
    try {
      const existing = await this.usersService.findByEmail(dto.email);

      if (existing) {
        throw new BadRequestException('Email already exists');
      }

      const hash = await bcrypt.hash(dto.password, 10);

      const user = await this.usersService.createUser({
        name: dto.name,
        email: dto.email,
        password: hash,
        role: 'USER',
      });

      return {
        success: true,
        message: "User registered successfully",
        userId: user._id
      }
    } catch (error) {
      return {
        success: false,
        message: "User registration failed"
      }
    }
  }

  async signin(dto: any) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: '24h' },
    );

    return token;
  }
}

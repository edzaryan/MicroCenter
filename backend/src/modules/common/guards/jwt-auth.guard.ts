import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

interface JwtPayload {
  _id: string;
  role: string; // ⭐ IMPORTANT
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token =
      request.cookies?.token ||
      request.headers?.authorization?.split(' ')[1];

    if (!token) {
      throw new ForbiddenException('Please login');
    }

    try {
      const decoded = await new Promise<JwtPayload>((resolve, reject) => {
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
          if (err) return reject(err);
          resolve(decoded as JwtPayload);
        });
      });

      // ⭐ Required by RolesGuard
      request.user = decoded; // <-- FIX

      return true;
    } catch (err) {
      throw new UnauthorizedException(
        err.message === 'jwt malformed' ? 'Invalid token' : err.message,
      );
    }
  }
}

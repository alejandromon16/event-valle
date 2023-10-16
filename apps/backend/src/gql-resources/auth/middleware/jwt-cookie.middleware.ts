
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AuthService } from '../auth.service'; // Import your authentication service

@Injectable()
export class JwtCookieMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: () => void) {
    const user = req.user
    if(user){
      const token = await this.authService.generateToken(user["id"])
      this.authService.setJwtCookie(res, token);
    }

    next();
  }
}

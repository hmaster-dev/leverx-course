import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
import { NextFunction } from 'express';
import { ExpressRequestInterface } from '../../types/expressRequest.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}
  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decode = verify(token, this.configService.get('JWT_SECRET'));
      req.user = await this.userService.getUserById(decode.id);
      next();
    } catch (e) {
      req.user = null;
      next();
    }
  }
}

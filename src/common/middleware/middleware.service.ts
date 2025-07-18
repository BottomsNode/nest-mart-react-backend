import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import {
  AuthenticatedUser,
  CustomBadGatewayException,
  CustomUnauthorizedException,
  jwtSecret,
} from 'src/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new CustomUnauthorizedException('Unauthorized');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, jwtSecret) as AuthenticatedUser;
      req['user'] = decoded;

      console.log('Incomming Token Decoded >>>>>>>>>>>>>>>>>>> ', decoded);
      next();
    } catch {
      throw new CustomBadGatewayException('Invalid token');
    }
  }
}

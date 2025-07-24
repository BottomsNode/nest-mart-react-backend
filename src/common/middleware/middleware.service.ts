import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import Redis from 'ioredis';
import {
  AuthenticatedUser,
  CustomBadGatewayException,
  CustomUnauthorizedException,
  jwtSecret,
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
} from 'src/common';

let redisClient: Redis | null = null;

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private redis: Redis;

  constructor() {
    if (!redisClient) {
      redisClient = new Redis({
        host: REDIS_HOST,
        port: parseInt(REDIS_PORT, 10),
        password: REDIS_PASSWORD,
      });
    }
    this.redis = redisClient;
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new CustomUnauthorizedException('Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, jwtSecret) as AuthenticatedUser;

      const now = Math.floor(Date.now() / 1000);
      const exp = (decoded as any).exp;

      if (!exp || exp <= now) {
        throw new CustomUnauthorizedException('Token expired');
      }

      // Get stored token from Redis for this user
      const storedToken = await this.redis.get(`user_token:${decoded.id}`);

      if (!storedToken) {
        throw new CustomUnauthorizedException('Session expired. Please login again.');
      }

      if (storedToken !== token) {
        throw new CustomUnauthorizedException('You have logged in from another device/session.');
      }

      req['user'] = decoded;
      next();
    } catch (err) {
      if (err instanceof CustomUnauthorizedException) throw err;
      throw new CustomBadGatewayException('Invalid token');
    }
  }

}

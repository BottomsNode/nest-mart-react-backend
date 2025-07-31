import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import Redis from 'ioredis';
import { LoginDTO } from './dto/login.dto';
import { CustomUnauthorizedException } from 'src/common/exception/unauthorized.exception';
import { CustomNotFoundException } from 'src/common';
import { Request } from 'express';
import { CustomerActivityLogService } from '../log/customer-activity-log.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly logService: CustomerActivityLogService,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new CustomNotFoundException('User');
    }

    if (!user.isActive) {
      throw new CustomUnauthorizedException('Account is deactivated. Please contact support.');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new CustomUnauthorizedException('Invalid Credentials');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: {
        name: user.role.name,
        permissions: user.role.permissions.map((p) => p.name),
      },
    }
  }

  async login(body: LoginDTO, req?: Request) {
    const user = await this.validateUser(body.email, body.password);

    const existingToken = await this.redisClient.get(`user_token:${user.id}`);
    if (existingToken) {
      await this.redisClient.del(`user_token:${user.id}`);
      throw new CustomUnauthorizedException(
        'You were active on another device.\nYou have been logged out from the last device.\nPlease log in again.'
      );
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role.name,
      permissions: user.role.permissions,
    };

    const token = this.jwtService.sign(payload);

    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const now = Math.floor(Date.now() / 1000);
    const ttl = decoded.exp - now;

    await this.redisClient.set(`user_token:${user.id}`, token, 'EX', ttl);

    try {
      await this.logService.log(
        await this.userService.findById(user.id),
        'User Logged In',
        {
          ip: req?.ip || 'unknown',
          userAgent: req?.headers['user-agent'] || 'unknown',
        }
      );
    } catch (err) {
      console.error('Failed to log login activity:', err);
    }

    return token;
  }

  async logout(userId: number): Promise<void> {
    const deleted = await this.redisClient.del(`user_token:${userId}`);
    if (!deleted) {
      throw new CustomUnauthorizedException('No active session found for this user.');
    }
  }

}

import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import Redis from 'ioredis';
import { LoginDTO } from './dto/login.dto';
import { CustomUnauthorizedException } from 'src/common/exception/unauthorized.exception';
import { error } from 'console';
import { CustomNotFoundException } from 'src/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new CustomNotFoundException('User Not Found');
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

  async login(body: LoginDTO) {
    const user = await this.validateUser(body.email, body.password);
    const existingToken = await this.redisClient.get(`user_token:${user.id}`);
    if (existingToken) {
      await this.redisClient.del(`user_token:${user.id}`);
      throw new CustomUnauthorizedException('User already logged in with an active token');
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
    return token;
  }

  async logout(userId: number): Promise<void> {
    const deleted = await this.redisClient.del(`user_token:${userId}`);
    if (!deleted) {
      throw new CustomUnauthorizedException('No active session found for this user.');
    }
  }

}

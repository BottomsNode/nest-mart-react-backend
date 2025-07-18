import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { CustomUnauthorizedException } from 'src/common/exception/unauthorized.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (
      user &&
      user.isActive &&
      (await bcrypt.compare(password, user.password))
    ) {
      return {
        id: user.id,
        email: user.email,
        role: {
          name: user.role.name,
          permissions: user.role.permissions.map((p) => p.name),
        },
      };
    }

    throw new CustomUnauthorizedException(
      user && !user.isActive
        ? 'Account is deactivated. Please contact support.'
        : 'Invalid credentials'
    );
  }


  async login(body: LoginDTO) {
    const user = await this.validateUser(body.email, body.password);
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role.name,
      permissions: user.role.permissions,
    };
    const token = this.jwtService.sign(payload);
    return token;
  }
}

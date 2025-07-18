import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload, jwtSecret } from 'src/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${jwtSecret}`,
    });
  }

  validate(payload: JwtPayload) {
    console.log(
      'User Incomming Payload : >>>>>>>>>>>>>>>>>>>>>>>>>> ',
      payload,
    );
    return {
      userId: payload.id,
      email: payload.email,
      role: payload.role,
      permission: payload.permissions,
    };
  }
}

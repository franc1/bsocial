import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

import { Token } from '../token.request';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.jwtPrivateKey,
      usernameField: 'id',
    });
  }

  async validate(payload: { id: number }) {
    const user = await this.userService.findOne({ id: payload.id });
    if (!user) {
      throw new UnauthorizedException();
    }

    return new Token(user.id, user.email, user.username);
  }
}

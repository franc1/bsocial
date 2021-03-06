import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ApiError } from 'apps/bsocial-api/src/shared/api-error';
import { ErrorCodes } from 'apps/bsocial-api/src/shared/error-codes';
import { Strategy } from 'passport-local';

import { AuthService } from '../../auth.service';
import { Token } from '../token.request';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'usernameOrEmail' });
  }

  async validate(usernameOrEmail: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(usernameOrEmail, password);
    if (!user) {
      throw new ApiError(400, ErrorCodes.INVALID_EMAIL_OR_USERNAME_OR_PASSWORD);
    }

    return new Token(user.id, user.email, user.username);
  }
}

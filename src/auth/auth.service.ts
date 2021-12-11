import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';

import { Token } from './passport-strategies/token.request';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    usernameOrEmail: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.findOne(
      { usernameOrEmail },
      {
        withPassword: true,
      },
    );
    if (!user) {
      return null;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return null;
    }

    delete user.password;
    return user;
  }

  async login(token: Token) {
    const payload = {
      id: token.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

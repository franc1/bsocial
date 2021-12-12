import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';

import { LoginResponseDTO } from './dto/login.response.dto';
import { Token } from './passport-strategies/token.request';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject('KAFKA')
    private readonly kafka: ClientProxy,
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

  async login(token: Token): Promise<LoginResponseDTO> {
    // Send Kafka message
    this.kafka.emit('login', { ...token });

    const payload = {
      id: token.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

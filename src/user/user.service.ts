import { Injectable } from '@nestjs/common';

import { User } from './models/user.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findOne(
    by: { usernameOrEmail?: string; id?: number },
    options: { withPassword?: boolean } = {
      withPassword: false,
    },
  ): Promise<User | undefined> {
    const { withPassword } = options;
    const { usernameOrEmail, id } = by;

    // Username or Id should be sent always!!
    if (!usernameOrEmail && !id) {
      return null;
    }

    let where: any;
    if (id) {
      where.id = id;
    } else if (usernameOrEmail) {
      where = [{ username: usernameOrEmail }, { email: usernameOrEmail }]; // search by username or email
    }

    const user = await this.userRepository.findOne({
      where,
    });

    if (user && !withPassword) {
      delete user.password;
    }

    return user;
  }
}

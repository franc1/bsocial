import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Token } from 'src/auth/passport-strategies/token.request';
import { Post } from 'src/post/models/post.model';
import { PostService } from 'src/post/post.service';
import { ApiError } from 'src/shared/api-error';
import { ErrorCodes } from 'src/shared/error-codes';
import { hashPassword } from 'src/shared/hash-password';
import { PaginationParams } from 'src/shared/pagination.dto';

import { UserRegisterDTO } from './models/dto/user-register.dto';
import { User } from './models/user.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly postService: PostService,
  ) {}

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

    let where: any = {};
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

  async register(userDTO: UserRegisterDTO): Promise<User> {
    if (userDTO.password !== userDTO.confirmPassword) {
      throw new ApiError(
        400,
        ErrorCodes.PASSWORD_AND_PASSWORD_CONFIRMATION_DO_NOT_MATCH,
      );
    }

    // Check email/username existence
    const countEmailsAndUsernames = await this.userRepository.count({
      where: [{ email: userDTO.email }, { username: userDTO.username }],
    });
    if (countEmailsAndUsernames) {
      throw new ApiError(400, ErrorCodes.EMAIL_OR_USERNAME_ALREADY_EXISTS);
    }

    const user = new User();
    user.firstName = userDTO.firstName;
    user.lastName = userDTO.lastName;
    user.email = userDTO.email;
    user.username = userDTO.username;
    user.password = await hashPassword(userDTO.password);

    return await this.userRepository.save(user);
  }

  async getAllUserPosts(
    id: number,
    pagination: PaginationParams,
    token: Token,
  ): Promise<{ posts: Post[]; postCount: number }> {
    // Check if user is accesible
    if (id !== token.id) {
      const user = await this.userRepository.findOne(id, {
        loadRelationIds: { relations: ['followedByUsers'] },
      });
      if (!user) {
        throw new NotFoundException();
      }

      if (!(user.followedByUsers as number[]).find((uId) => uId === token.id)) {
        throw new ForbiddenException(
          ErrorCodes.CANNOT_ACCESS_POSTS_OF_THIS_USER,
        );
      }
    }

    return await this.postService.getAll({ userId: id }, pagination);
  }

  async followUser(id: number, token: Token): Promise<void> {
    if (token.id === id) {
      throw new ApiError(400, ErrorCodes.CANNOT_FOLLOW_YOURSELF);
    }
    const tokenUser = await this.userRepository.findOne(token.id);

    const userToFollow = await this.userRepository.findOne(id, {
      relations: ['followedByUsers'],
    });
    if (!userToFollow) {
      throw new NotFoundException();
    }

    if (
      (userToFollow.followedByUsers as User[]).find((u) => u.id === token.id)
    ) {
      throw new ApiError(400, ErrorCodes.USER_ALREADY_FOLLOWED);
    }

    (userToFollow.followedByUsers as User[]).push(tokenUser);
    await this.userRepository.save(userToFollow);
  }
}

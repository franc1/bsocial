import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Token } from 'src/auth/passport-strategies/token.request';
import { Public } from 'src/decorators/public-route.decorator';
import { TokenParam } from 'src/decorators/token.decorator';
import { PostResponsePagination } from 'src/post/models/dto/post-page.response';
import { Post as PostModel } from 'src/post/models/post.model';
import { ErrorResponse } from 'src/shared/error.response';
import { PaginationParams } from 'src/shared/pagination.dto';

import { UserRegisterDTO } from './models/dto/user-register.dto';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
@ApiBadRequestResponse({
  type: ErrorResponse,
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiSecurity({})
  @Public()
  @Post()
  async register(@Body() userDTO: UserRegisterDTO): Promise<User> {
    const user = await this.userService.register(userDTO);

    return plainToClass(User, user);
  }

  @Get(':id/post')
  @ApiUnauthorizedResponse({
    type: ErrorResponse,
  })
  @ApiForbiddenResponse({
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    type: ErrorResponse,
  })
  async getAllUserPosts(
    @Param('id', ParseIntPipe) id: number,
    @Query() pagination: PaginationParams,
    @TokenParam() token: Token,
  ): Promise<PostResponsePagination> {
    const { posts, postCount } = await this.userService.getAllUserPosts(
      id,
      pagination,
      token,
    );

    const postsResponse = plainToClass(PostModel, posts);

    return {
      posts: postsResponse,
      itemsTotal: postCount,
      pagesTotal: Math.ceil(postCount / pagination.size),
    };
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
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
import { Post as PostModel } from 'src/post/models/post.model';
import { ErrorResponse } from 'src/shared/error.response';

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
    @TokenParam() token: Token,
  ): Promise<PostModel[]> {
    const userPosts = await this.userService.getAllUserPosts(id, token);

    return plainToClass(PostModel, userPosts);
  }
}

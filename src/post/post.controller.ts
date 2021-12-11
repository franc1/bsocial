import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Token } from 'src/auth/passport-strategies/token.request';
import { TokenParam } from 'src/decorators/token.decorator';
import { ErrorResponse } from 'src/shared/error.response';

import { PostCreateDTO } from './models/dto/post-create.dto';
import { Post as PostModel } from './models/post.model';
import { PostService } from './post.service';

@Controller('post')
@ApiTags('post')
@ApiBadRequestResponse({
  type: ErrorResponse,
})
@ApiUnauthorizedResponse({
  type: ErrorResponse,
})
@ApiForbiddenResponse({
  type: ErrorResponse,
})
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(
    @Body() postDTO: PostCreateDTO,
    @TokenParam() token: Token,
  ): Promise<PostModel> {
    const user = await this.postService.create(postDTO, token);

    return plainToClass(PostModel, user);
  }
}

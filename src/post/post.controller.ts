import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Token } from 'src/auth/passport-strategies/token.request';
import { Comment } from 'src/comment/models/comment.model';
import { TokenParam } from 'src/decorators/token.decorator';
import { ErrorResponse } from 'src/shared/error.response';

import { CommentCreateDTO } from './models/dto/comment-create.dto';
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

  @Post(':id/comment')
  @ApiNotFoundResponse({
    type: ErrorResponse,
  })
  async createComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() commentDTO: CommentCreateDTO,
    @TokenParam() token: Token,
  ): Promise<Comment> {
    const comment = await this.postService.createComment(id, commentDTO, token);

    return plainToClass(Comment, comment);
  }

  @Post()
  async create(
    @Body() postDTO: PostCreateDTO,
    @TokenParam() token: Token,
  ): Promise<PostModel> {
    const user = await this.postService.create(postDTO, token);

    return plainToClass(PostModel, user);
  }
}

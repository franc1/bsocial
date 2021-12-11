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
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Token } from 'src/auth/passport-strategies/token.request';
import { Comment } from 'src/comment/models/comment.model';
import { CommentResponsePagination } from 'src/comment/models/dto/comment-page.response';
import { TokenParam } from 'src/decorators/token.decorator';
import { ErrorResponse } from 'src/shared/error.response';
import { PaginationParams } from 'src/shared/pagination.dto';

import { CommentCreateDTO } from '../comment/models/dto/comment-create.dto';
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

  @Get(':id/comment')
  @ApiNotFoundResponse({
    type: ErrorResponse,
  })
  async getAllPostComments(
    @Param('id', ParseIntPipe) id: number,
    @Query() pagination: PaginationParams,
    @TokenParam() token: Token,
  ): Promise<CommentResponsePagination> {
    const { comments, commentCount } =
      await this.postService.getAllPostComments(id, pagination, token);

    const commentsResponse = plainToClass(Comment, comments);

    return {
      comments: commentsResponse,
      itemsTotal: commentCount,
      pagesTotal: Math.ceil(commentCount / pagination.size),
    };
  }

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

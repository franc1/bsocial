import { Injectable } from '@nestjs/common';

import { Token } from '../auth/passport-strategies/token.request';
import { PaginationParams } from '../shared/pagination.dto';
import { CommentRepository } from './comment.repository';
import { Comment } from './models/comment.model';
import { CommentCreateDTO } from './models/dto/comment-create.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async getAll(
    filters: { postId: number },
    pagination: PaginationParams,
  ): Promise<{ comments: Comment[]; commentCount: number }> {
    const { postId } = filters;
    const { size, page } = pagination;

    const [comments, commentCount] = await this.commentRepository.findAndCount({
      relations: ['createdBy'],
      where: { post: postId },
      skip: page > 0 ? (page - 1) * size : 0,
      take: size,
    });

    return { comments, commentCount };
  }

  async create(
    postId: number,
    commentDTO: CommentCreateDTO,
    token: Token,
  ): Promise<Comment> {
    const comment = new Comment();
    comment.content = commentDTO.content;
    comment.createdBy = token.id;
    comment.post = postId;

    return await this.commentRepository.save(comment);
  }
}

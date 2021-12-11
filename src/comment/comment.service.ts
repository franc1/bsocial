import { Injectable } from '@nestjs/common';
import { Token } from 'src/auth/passport-strategies/token.request';
import { CommentCreateDTO } from 'src/post/models/dto/comment-create.dto';

import { CommentRepository } from './comment.repository';
import { Comment } from './models/comment.model';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

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

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Token } from 'src/auth/passport-strategies/token.request';
import { CommentService } from 'src/comment/comment.service';
import { Comment } from 'src/comment/models/comment.model';
import { ErrorCodes } from 'src/shared/error-codes';
import { PaginationParams } from 'src/shared/pagination.dto';
import { User } from 'src/user/models/user.model';

import { CommentCreateDTO } from './models/dto/comment-create.dto';
import { PostCreateDTO } from './models/dto/post-create.dto';
import { Post } from './models/post.model';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly commentService: CommentService,
  ) {}

  async create(postDTO: PostCreateDTO, token: Token): Promise<Post> {
    const post = new Post();
    post.content = postDTO.content;
    post.createdBy = token.id;

    return await this.postRepository.save(post);
  }

  async createComment(
    postId: number,
    commentDTO: CommentCreateDTO,
    token: Token,
  ): Promise<Comment> {
    await this.checkIfPostIsAccessibleForThisUser(postId, token);

    return await this.commentService.create(postId, commentDTO, token);
  }

  async getAll(
    filters: { userId: number },
    pagination: PaginationParams,
  ): Promise<{ posts: Post[]; postCount: number }> {
    const { userId } = filters;
    const { size, page } = pagination;

    const [posts, postCount] = await this.postRepository.findAndCount({
      where: { createdBy: userId },
      skip: page > 0 ? (page - 1) * size : 0,
      take: size,
    });

    return { posts, postCount };
  }

  async getAllPostComments(
    postId: number,
    pagination: PaginationParams,
    token: Token,
  ): Promise<{ comments: Comment[]; commentCount: number }> {
    await this.checkIfPostIsAccessibleForThisUser(postId, token);

    return await this.commentService.getAll({ postId }, pagination);
  }

  async checkIfPostIsAccessibleForThisUser(
    postId: number,
    token: Token,
  ): Promise<void> {
    const post = await this.postRepository.findOne(postId, {
      relations: ['createdBy', 'createdBy.followedByUsers'],
    });
    if (!post) {
      throw new NotFoundException();
    }

    // Check if post is accesible
    if (token.id !== (post.createdBy as User).id) {
      if (
        !((post.createdBy as User).followedByUsers as User[]).find(
          (u) => u.id === token.id,
        )
      ) {
        throw new ForbiddenException(
          ErrorCodes.CANNOT_ACCESS_THIS_POST_AND_ITS_COMMENTS,
        );
      }
    }
  }
}

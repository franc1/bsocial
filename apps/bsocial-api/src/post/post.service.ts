import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { Token } from '../auth/passport-strategies/token.request';
import { CommentService } from '../comment/comment.service';
import { Comment } from '../comment/models/comment.model';
import { CommentCreateDTO } from '../comment/models/dto/comment-create.dto';
import { ErrorCodes } from '../shared/error-codes';
import { PaginationParams } from '../shared/pagination.dto';
import { User } from '../user/models/user.model';
import { PostCreateDTO } from './models/dto/post-create.dto';
import { Post } from './models/post.model';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly commentService: CommentService,
    @Inject('KAFKA')
    private readonly kafka: ClientProxy,
  ) {}

  async create(postDTO: PostCreateDTO, token: Token): Promise<Post> {
    let post = new Post();
    post.content = postDTO.content;
    post.createdBy = token.id;

    post = await this.postRepository.save(post);

    // Send Kafka message
    this.kafka.emit('create-post', {
      username: token.username,
      email: token.email,
      userId: token.id,
      timestamp: +post.createdDate,
      postId: post.id,
      messageContent: post.content,
    });

    return post;
  }

  async createComment(
    postId: number,
    commentDTO: CommentCreateDTO,
    token: Token,
  ): Promise<Comment> {
    const postCreatedById = await this.checkIfPostIsAccessibleForThisUser(
      postId,
      token,
    );

    const comment = await this.commentService.create(postId, commentDTO, token);

    // Send Kafka message
    this.kafka.emit('create-comment', {
      senderUsername: token.username,
      senderEmail: token.email,
      senderId: token.id,
      timestamp: +comment.createdDate,
      postId: postId,
      commentId: comment.id,
      commentContent: comment.content,
      postOwnerId: postCreatedById,
    });

    return comment;
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
  ): Promise<number> {
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

    return (post.createdBy as User).id;
  }
}

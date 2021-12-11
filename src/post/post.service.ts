import { Injectable } from '@nestjs/common';
import { Token } from 'src/auth/passport-strategies/token.request';
import { PaginationParams } from 'src/shared/pagination.dto';

import { PostCreateDTO } from './models/dto/post-create.dto';
import { Post } from './models/post.model';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(postDTO: PostCreateDTO, token: Token): Promise<Post> {
    const post = new Post();
    post.content = postDTO.content;
    post.createdBy = token.id;

    return await this.postRepository.save(post);
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
}

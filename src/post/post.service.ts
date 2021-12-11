import { Injectable } from '@nestjs/common';
import { Token } from 'src/auth/passport-strategies/token.request';

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
}

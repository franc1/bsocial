import { EntityRepository, Repository } from 'typeorm';

import { Post } from './models/post.model';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {}

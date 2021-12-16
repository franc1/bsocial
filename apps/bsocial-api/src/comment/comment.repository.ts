import { EntityRepository, Repository } from 'typeorm';

import { Comment } from './models/comment.model';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {}

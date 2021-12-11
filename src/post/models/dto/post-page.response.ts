import { ApiProperty } from '@nestjs/swagger';
import { BaseResponsePagination } from 'src/shared/base-pagination.response';

import { Post } from '../post.model';

export class PostResponsePagination extends BaseResponsePagination {
  @ApiProperty({ type: () => [Post] })
  posts: Post[];
}

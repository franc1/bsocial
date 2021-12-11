import { ApiProperty } from '@nestjs/swagger';
import { BaseResponsePagination } from 'src/shared/base-pagination.response';

import { Comment } from '../comment.model';

export class CommentResponsePagination extends BaseResponsePagination {
  @ApiProperty({ type: () => [Comment] })
  comments: Comment[];
}

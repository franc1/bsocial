import { ApiProperty } from '@nestjs/swagger';

export class BaseResponsePagination {
  @ApiProperty()
  pagesTotal: number;

  @ApiProperty()
  itemsTotal: number;
}

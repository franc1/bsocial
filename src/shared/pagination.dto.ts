import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationParams {
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  size?: number = 10;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 0;
}

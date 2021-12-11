import { IsNotEmpty, IsString } from 'class-validator';

export class PostCreateDTO {
  @IsNotEmpty()
  @IsString()
  content: string;
}

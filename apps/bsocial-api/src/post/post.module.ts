import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentModule } from '../comment/comment.module';
import { clientProxyFactory } from '../shared/client-proxy-factory';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository]), CommentModule],
  controllers: [PostController],
  providers: [
    PostService,
    {
      provide: 'KAFKA',
      useValue: clientProxyFactory,
    },
  ],
  exports: [PostService],
})
export class PostModule {}

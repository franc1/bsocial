import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { CommentBody, CommentResult } from './interfaces/comment';
import { LoginBody, LoginResult } from './interfaces/login';
import { PostBody, PostResult } from './interfaces/post';
import { RegisterBody, RegisterResult } from './interfaces/register';

@Injectable()
export class BsocialElasticsearchMicroserviceService {
  postIndex = 'posts';
  commentIndex = 'comments';
  loginIndex = 'login';
  registerIndex = 'register';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async saveLoginMessage(loginBody: LoginBody): Promise<void> {
    await this.elasticsearchService.index<LoginResult, LoginBody>({
      index: this.loginIndex,
      body: {
        ...loginBody,
      },
    });
  }

  async saveRegisterMessage(registerBody: RegisterBody): Promise<void> {
    await this.elasticsearchService.index<RegisterResult, RegisterBody>({
      index: this.registerIndex,
      body: {
        ...registerBody,
      },
    });
  }

  async savePostMessage(postBody: PostBody): Promise<void> {
    await this.elasticsearchService.index<PostResult, PostBody>({
      index: this.postIndex,
      body: {
        ...postBody,
      },
    });
  }

  async saveCommentMessage(commentBody: CommentBody): Promise<void> {
    await this.elasticsearchService.index<CommentResult, CommentBody>({
      index: this.commentIndex,
      body: {
        ...commentBody,
      },
    });
  }
}

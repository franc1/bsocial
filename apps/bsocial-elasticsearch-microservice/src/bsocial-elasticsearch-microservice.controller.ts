import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { BsocialElasticsearchMicroserviceService } from './bsocial-elasticsearch-microservice.service';

@Controller()
export class BsocialElasticsearchMicroserviceController {
  constructor(
    private readonly bsocialElasticsearchMicroserviceService: BsocialElasticsearchMicroserviceService,
  ) {}

  @MessagePattern('login')
  public async login(@Payload() payload: any) {
    if (payload.value) {
      await this.bsocialElasticsearchMicroserviceService.saveLoginMessage(
        payload.value,
      );
    }
  }

  @MessagePattern('register')
  public async register(@Payload() payload: any) {
    if (payload.value) {
      await this.bsocialElasticsearchMicroserviceService.saveRegisterMessage(
        payload.value,
      );
    }
  }

  @MessagePattern('create-post')
  public async createPost(@Payload() payload: any) {
    if (payload.value) {
      await this.bsocialElasticsearchMicroserviceService.savePostMessage(
        payload.value,
      );
    }
  }

  @MessagePattern('create-comment')
  public async createComment(@Payload() payload: any) {
    if (payload.value) {
      await this.bsocialElasticsearchMicroserviceService.saveCommentMessage(
        payload.value,
      );
    }
  }
}

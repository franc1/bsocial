import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { BsocialNotificationsMicroserviceGateway } from './bsocial-notifications-microservice.gateway';

@Controller()
export class BsocialNotificationsMicroserviceController {
  constructor(
    private readonly bsocialNotificationsMicroserviceGateway: BsocialNotificationsMicroserviceGateway,
  ) {}

  @MessagePattern('create-comment')
  public createComment(@Payload() payload: any) {
    if (payload.value) {
      this.bsocialNotificationsMicroserviceGateway.send(payload.value);
    }
  }
}

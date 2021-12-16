import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { BsocialNotificationsMicroserviceService } from './bsocial-notifications-microservice.service';

@Controller()
export class BsocialNotificationsMicroserviceController {
  constructor(
    private readonly bsocialNotificationsMicroserviceService: BsocialNotificationsMicroserviceService,
  ) {}

  @MessagePattern('create-comment')
  public createComment(@Payload() payload: any) {
    console.log('----------', payload.value);
  }
}

import { Controller, Get } from '@nestjs/common';

import { BsocialNotificationsMicroserviceService } from './bsocial-notifications-microservice.service';

@Controller()
export class BsocialNotificationsMicroserviceController {
  constructor(
    private readonly bsocialNotificationsMicroserviceService: BsocialNotificationsMicroserviceService,
  ) {}

  @Get()
  getHello(): string {
    return this.bsocialNotificationsMicroserviceService.getHello();
  }
}

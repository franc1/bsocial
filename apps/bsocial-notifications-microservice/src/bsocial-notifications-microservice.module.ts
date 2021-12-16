import { Module } from '@nestjs/common';

import { BsocialNotificationsMicroserviceController } from './bsocial-notifications-microservice.controller';
import { BsocialNotificationsMicroserviceService } from './bsocial-notifications-microservice.service';

@Module({
  imports: [],
  controllers: [BsocialNotificationsMicroserviceController],
  providers: [BsocialNotificationsMicroserviceService],
})
export class BsocialNotificationsMicroserviceModule {}

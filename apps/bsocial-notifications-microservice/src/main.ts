import { NestFactory } from '@nestjs/core';

import { BsocialNotificationsMicroserviceModule } from './bsocial-notifications-microservice.module';

async function bootstrap() {
  const app = await NestFactory.create(BsocialNotificationsMicroserviceModule);
  await app.listen(3000);
}
bootstrap();

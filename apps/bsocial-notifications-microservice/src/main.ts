import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { BsocialNotificationsMicroserviceModule } from './bsocial-notifications-microservice.module';

const port = process.env.notificationsMicroservicePort;

async function bootstrap() {
  const app = await NestFactory.create(BsocialNotificationsMicroserviceModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      consumer: {
        groupId: 'notifications',
      },
      client: {
        brokers: ['localhost:9092'],
      },
    },
  } as MicroserviceOptions);

  app.startAllMicroservices();

  await app.listen(port);
}
bootstrap();

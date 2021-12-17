import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { BsocialNotificationsMicroserviceModule } from './bsocial-notifications-microservice.module';

const port = process.env.notificationsMicroservicePort;
const kafkaHost = process.env.kafkaHost;
const kafkaPort = process.env.kafkaPort;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    BsocialNotificationsMicroserviceModule,
  );

  app.useStaticAssets(join(__dirname, '../../..', 'static'));

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      consumer: {
        groupId: 'notifications',
      },
      client: {
        brokers: [`${kafkaHost}:${kafkaPort}`],
      },
    },
  } as MicroserviceOptions);

  app.startAllMicroservices();

  await app.listen(port);
}
bootstrap();

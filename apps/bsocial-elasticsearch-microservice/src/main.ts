import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { BsocialElasticsearchMicroserviceModule } from './bsocial-elasticsearch-microservice.module';

const port = process.env.elasticsearchMicroservicePort;

async function bootstrap() {
  const app = await NestFactory.create(BsocialElasticsearchMicroserviceModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      consumer: {
        groupId: 'elasticsearch',
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

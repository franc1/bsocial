import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { BsocialElasticsearchMicroserviceModule } from './bsocial-elasticsearch-microservice.module';

const port = process.env.elasticsearchMicroservicePort;
const kafkaHost = process.env.kafkaHost;
const kafkaPort = process.env.kafkaPort;

async function bootstrap() {
  const app = await NestFactory.create(BsocialElasticsearchMicroserviceModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      consumer: {
        groupId: 'elasticsearch',
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

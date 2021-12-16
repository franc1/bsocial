import { NestFactory } from '@nestjs/core';

import { BsocialElasticsearchMicroserviceModule } from './bsocial-elasticsearch-microservice.module';

const port = process.env.elasticsearchMicroservicePort;

async function bootstrap() {
  const app = await NestFactory.create(BsocialElasticsearchMicroserviceModule);
  await app.listen(port);
}
bootstrap();

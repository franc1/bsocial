import { Module } from '@nestjs/common';

import { BsocialElasticsearchMicroserviceController } from './bsocial-elasticsearch-microservice.controller';
import { BsocialElasticsearchMicroserviceService } from './bsocial-elasticsearch-microservice.service';

@Module({
  imports: [],
  controllers: [BsocialElasticsearchMicroserviceController],
  providers: [BsocialElasticsearchMicroserviceService],
})
export class BsocialElasticsearchMicroserviceModule {}

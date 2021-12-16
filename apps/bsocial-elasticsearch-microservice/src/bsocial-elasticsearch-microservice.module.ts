import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

import { BsocialElasticsearchMicroserviceController } from './bsocial-elasticsearch-microservice.controller';
import { BsocialElasticsearchMicroserviceService } from './bsocial-elasticsearch-microservice.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
        auth: {
          username: configService.get('ELASTICSEARCH_USERNAME'),
          password: configService.get('ELASTICSEARCH_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [BsocialElasticsearchMicroserviceController],
  providers: [BsocialElasticsearchMicroserviceService],
})
export class BsocialElasticsearchMicroserviceModule {}

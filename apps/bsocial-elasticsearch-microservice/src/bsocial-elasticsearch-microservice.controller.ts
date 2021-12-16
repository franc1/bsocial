import { Controller, Get } from '@nestjs/common';

import { BsocialElasticsearchMicroserviceService } from './bsocial-elasticsearch-microservice.service';

@Controller()
export class BsocialElasticsearchMicroserviceController {
  constructor(
    private readonly bsocialElasticsearchMicroserviceService: BsocialElasticsearchMicroserviceService,
  ) {}

  @Get()
  getHello(): string {
    return this.bsocialElasticsearchMicroserviceService.getHello();
  }
}

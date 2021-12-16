import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { BsocialNotificationsMicroserviceController } from './bsocial-notifications-microservice.controller';
import { BsocialNotificationsMicroserviceGateway } from './bsocial-notifications-microservice.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtPrivateKey'),
      }),
    }),
  ],
  controllers: [BsocialNotificationsMicroserviceController],
  providers: [BsocialNotificationsMicroserviceGateway],
})
export class BsocialNotificationsMicroserviceModule {}

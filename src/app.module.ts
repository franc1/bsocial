import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const getOrmConfig = (configService: ConfigService) =>
  ({
    name: 'default',
    type: 'mysql',
    host: configService.get('dbHost'),
    port: configService.get('dbPort'),
    username: configService.get('dbUser'),
    password: configService.get('dbPass'),
    database: configService.get('dbName'),
    logger: 'advanced-console',
    logging: process.env.NODE_ENV !== 'production',
    migrationsRun: true,
    entities: [__dirname + '/**/*.model.{js,ts}'],
    migrations: [__dirname + '/migrations/*.{js,ts}'],
    subscribers: [__dirname + '/subscribers/**/*.{js,ts}'],
  } as ConnectionOptions);

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...getOrmConfig(configService),
        autoLoadEntities: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

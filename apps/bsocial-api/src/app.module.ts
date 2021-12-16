import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/passport-strategies/jwt/jwt-auth.guard';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import { HttpExceptionFilter } from './shared/http-exception.filter';
import { UserModule } from './user/user.module';

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
    PostModule,
    CommentModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

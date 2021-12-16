import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostModule } from '../post/post.module';
import { clientProxyFactory } from '../shared/client-proxy-factory';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), PostModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'KAFKA',
      useValue: clientProxyFactory,
    },
  ],
  exports: [UserService],
})
export class UserModule {}

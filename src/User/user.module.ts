import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserCreateMiddleware } from './middleware/userCreate.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { AuthService } from 'src/Auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserCreateMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.POST });
  }
}

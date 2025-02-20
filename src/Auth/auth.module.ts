import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/User/user.service';
import { UserModule } from 'src/User/user.module';

@Module({
  imports: [UserService],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

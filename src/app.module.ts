import { Module } from '@nestjs/common';
import { UserModule } from './User/user.module';
import { ProductsModule } from './Products/products.module';
import { AuthModule } from './Auth/auth.module';

@Module({
  imports: [UserModule, ProductsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

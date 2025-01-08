import { Module } from '@nestjs/common';
import { UserModule } from './User/user.module';
import { ProductsModule } from './Products/products.module';
import { AuthModule } from './Auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development.local',
      isGlobal: true,
    }),
    UserModule,
    ProductsModule,
    AuthModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

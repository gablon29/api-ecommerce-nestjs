import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/category.entity';
import { Product } from './product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductsModule {}

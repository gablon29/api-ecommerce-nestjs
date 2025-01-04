import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { productProviders } from './product.provider';

@Module({
  controllers: [ProductController],
  providers: [...productProviders, ProductService],
})
export class ProductsModule {}

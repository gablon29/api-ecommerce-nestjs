import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductDto } from './productDto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async productCreate(product: ProductDto): Promise<void> {
    await this.productRepository.create(product);
    this.productRepository.save(product);
  }
}

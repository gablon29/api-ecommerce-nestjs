import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductDto } from './productDto';
import { Category } from 'src/category/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async productCreate(product: ProductDto): Promise<void> {
    // buscamos la categoria
    const category = await this.categoryRepository.findOne({
      where: { id: product.category_id },
    });
    if (!category) {
      throw new Error('Category not found');
    }
    const newProduct = await this.productRepository.create({
      ...product,
      category_id: category,
    });
    this.productRepository.save(newProduct);
  }
}

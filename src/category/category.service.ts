import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CategoryDto } from './categoryDto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // Add methods here
  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({
      relations: {
        products: true,
      },
    });
  }

  async createCategory(category: CategoryDto): Promise<Category> {
    return this.categoryRepository.save(category);
  }
}

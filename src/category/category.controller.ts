import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CategoryDto } from './categoryDto';
import { CategoryService } from './category.service';
import { Response } from 'express';
import { Category } from './category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) {}

  @Get()
  getAllCategory(): Promise<Category[]> {
    return this.CategoryService.findAll();
  }

  @Post()
  async createCategory(
    @Body() category: CategoryDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const newCategory = await this.CategoryService.createCategory(category);
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    return;
  }
}

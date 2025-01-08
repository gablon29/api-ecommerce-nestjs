import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CategoryDto } from './categoryDto';
import { CategoryService } from './category.service';
import { Response } from 'express';

@Controller('category')
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) {}

  @Get()
  getAllCategory() {
    return this.CategoryService.findAll();
  }

  @Post()
  createCategory(@Body() category: CategoryDto, @Res() res: Response) {
    try {
      const newCategory = this.CategoryService.createCategory(category);
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

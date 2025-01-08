import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryDto } from './categoryDto';
import { Response } from 'express';
import { of, throwError } from 'rxjs';
import { Product } from 'src/Products/product.entity';
import { Category } from './category.entity';

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            findAll: jest.fn(),
            createCategory: jest.fn(),
          },
        },
      ],
    }).compile();

    categoryController = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  describe('getAllCategory', () => {
    it('should return an array of categories', async () => {
      const result = [{ id: 1, name: 'Category 1', products: [] }];
      jest
        .spyOn(categoryService, 'findAll')
        .mockReturnValue(Promise.resolve(result));

      expect(await categoryController.getAllCategory()).toBe(result);
    });
  });

  describe('createCategory', () => {
    it('should create a new category and return it', async () => {
      const categoryDto: CategoryDto = { name: 'New Category' };
      const result: Category = { id: 1, name: 'New Category', products: [] };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      jest
        .spyOn(categoryService, 'createCategory')
        .mockReturnValue(Promise.resolve(result));
      await categoryController.createCategory(categoryDto, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(result);
    });

    it('should return a 400 error if category creation fails', () => {
      const categoryDto: CategoryDto = { name: 'New Category' };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      jest.spyOn(categoryService, 'createCategory').mockImplementation(() => {
        throw new Error('Category creation failed');
      });

      categoryController.createCategory(categoryDto, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Category creation failed',
      });
    });
  });
});

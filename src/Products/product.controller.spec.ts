import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductDto } from './productDto';
import { Product } from './product.entity';
import { Response, Request } from 'express';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from 'src/category/category.entity';

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: {},
        },
      ],
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  describe('getAllProduct', () => {
    it('should return an array of products', async () => {
      const result: Product[] = [];
      jest
        .spyOn(productService, 'findAll')
        .mockResolvedValue(Promise.resolve(result));

      expect(await productController.getAllProduct()).toBe(result);
    });
  });

  describe('createProduct', () => {
    it('should create a product and return a success message', async () => {
      const productDto: ProductDto = {
        name: 'Test Product',
        description: 'dasfads',
        stock: 2,
        price: 100,
        imgUrl: 'https://www.google.com',
        category_id: new Category(),
        orderDetails: 'test',
      };
      const req = { body: {} } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      jest
        .spyOn(productService, 'productCreate')
        .mockImplementation(() => Promise.resolve());

      await productController.createProduct(productDto, res, req);

      expect(productService.productCreate).toHaveBeenCalledWith(productDto);
      expect(req.body.created_at).toBeDefined();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith('Product created successfully');
    });
  });
});

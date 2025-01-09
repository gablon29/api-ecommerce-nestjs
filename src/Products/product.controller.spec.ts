import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

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
});

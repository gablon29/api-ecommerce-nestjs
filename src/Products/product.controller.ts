import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ProductDto } from './productDto';
import { Request, Response } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProduct(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Post()
  createProduct(
    @Body() product: ProductDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<void> {
    this.productService.productCreate(product);
    let now = new Date();
    req.body.created_at = now;
    console.log('Request: ', req.body.created_at);
    res.status(201).send('Product created successfully');
    return;
  }
}

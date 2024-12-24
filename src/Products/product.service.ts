import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  getAllProducts(): string {
    return 'All products';
  }
  getProductById(productId: string) {
    return `Product with id ${productId}`;
  }
  createProduct(product: any) {
    return `Product created with name: ${product.name}`;
  }
  updateProduct(productId: string, product: any) {
    return `Product with id ${productId} updated with name: ${product.name}`;
  }
  deleteProduct(productId: string) {
    return `Product with id ${productId} deleted`;
  }
}

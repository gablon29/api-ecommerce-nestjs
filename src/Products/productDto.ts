import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Max,
} from 'class-validator';
import { Category } from 'src/category/category.entity';

export class ProductDto {
  @Length(3, 50)
  @IsString()
  name: string;
  @Length(200)
  @IsString()
  description: string;
  @IsInt()
  @Max(1000)
  stock: number;
  @IsString()
  imgUrl: string;
  @IsDecimal()
  price: number;
  @IsNotEmpty()
  category_id: Category;
  @IsString()
  orderDetails: string;
}

/**
id
name
description
stock
imgUrl
category_id
orderDetails
 */

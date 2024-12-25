import { IsDecimal, IsString, Length } from 'class-validator';

export class ProductDto {
  @IsString()
  @Length(3, 20)
  name: string;
  @IsDecimal()
  price: number;
  @IsString()
  @Length(3, 100)
  description: string;
}

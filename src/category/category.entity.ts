import { Product } from 'src/Products/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50, name: 'category_name', unique: true })
  name: string;
  @OneToMany(() => Product, (product) => product.category_id)
  products: Product[];
}

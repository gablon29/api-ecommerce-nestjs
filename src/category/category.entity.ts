import { Product } from 'src/Products/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ length: 50 })
  name: string;
  @OneToMany(() => Product, (product) => product.category_id)
  products: Product[];
}

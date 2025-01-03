import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 50 })
  name: string;
  @Column('text')
  description: string;
  @Column('number')
  stock: number;
  @Column('text')
  imgUrl: string;
  @ManyToOne(() => Category, (category) => category.products)
  category_id: Category;
  @Column()
  orderDetails: string;
}

/**
 * 
 * id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.

name: debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.

description: debe ser un texto y no puede ser nulo.

price: debe ser un número decimal con una precisión de 10 dígitos y una escala de 2 dígitos. No puede ser nulo.

stock: debe ser un valor numérico. No puede ser nulo.

imgUrl: debe ser una cadena de texto, en caso de no recibir un valor debe asignar una imagen por defecto.

category_id  (Relación 1:N).

Relación N:N con orderDetails.


 */

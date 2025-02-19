import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();
  @Column({ length: 30, nullable: false, name: 'name', type: 'varchar' })
  name: string;
  @Column({
    unique: true,
    nullable: false,
    name: 'username',
    type: 'varchar',
    length: 20,
  })
  username: string;
  @Column({ name: 'password', type: 'varchar', nullable: false })
  password: string;

  @DeleteDateColumn()
  deletedAt: Date;
}

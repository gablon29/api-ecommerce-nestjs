import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import * as bcry from 'bcrypt';
import { UserDto } from './userDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async createUser(user: UserDto): Promise<Users> {
    const salt = await bcry.genSalt(10);
    const hashPassword = await bcry.hash(user.password, salt);
    const newUser = this.userRepository.create({
      ...user,
      password: hashPassword,
    });
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<Users> {
    return this.userRepository.findOne({
      where: { id },
    });
  }
}

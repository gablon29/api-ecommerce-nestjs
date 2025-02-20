import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import * as bcry from 'bcryptjs';
import { UserDto } from './userDto';
import { ConfigService } from '@nestjs/config';
import { IUserService } from './IUser.service';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    @Inject(ConfigService) private configService: ConfigService,
  ) {}
  public async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.softDelete(id);
  }

  public async updateUser(id: string, user: UserDto): Promise<Users> {
    const userExist = await this.userRepository.findOne({ where: { id } });
    if (!userExist) {
      throw new NotFoundException('User not found');
    }
    const saltRound = this.configService.get<number>('PARSE_SALT_ROUND', 10);
    const hashedPassword = await bcry.hash(user.password, saltRound);
    const updatedUser = this.userRepository.merge(userExist, {
      ...user,
      password: hashedPassword,
    });
    return this.userRepository.save(updatedUser);
  }

  public async createUser(user: UserDto): Promise<Users> {
    const saltRound = this.configService.get<number>('PARSE_SALT_ROUND', 10);
    // verify if user exist
    const userExist = await this.userRepository.findOne({
      where: { username: user.username },
    });
    if (userExist) {
      throw new ConflictException('User already exist');
    }
    // if not exist, create user.
    const hashedPassword = await bcry.hash(user.password, 10);
    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword,
    });
    try {
      return this.userRepository.save(newUser);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  public async findOneById(id: string): Promise<Users> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  public async findOneByUsername(username: string): Promise<Users> {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  public async findAll(): Promise<Users[]> {
    const userFind = await this.userRepository.find();
    if (!userFind.length) {
      throw new NotFoundException('Users not found');
    }
    return userFind;
  }
}

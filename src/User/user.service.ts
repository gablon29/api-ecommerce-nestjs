import {
  ConflictException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Users } from './user.entity';
import * as bcry from 'bcrypt';
import { UserDto } from './userDto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    private dataSource: DataSource,
    @Inject(ConfigService) private configService: ConfigService,
  ) {}

  async createUser(user: Omit<UserDto, 'id'>): Promise<Users> {
    const saltRound = this.configService.get<number>('PARSE_SALT_ROUND', 10);
    // verify if user exist
    const userExist = await this.userRepository.findOne({
      where: { username: user.username },
    });
    if (userExist) {
      throw new ConflictException('User already exist');
    }
    // if not exist, create user.
    const hashedPassword = await bcry.hash(user.password, saltRound);
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

  async findOneById(id: string): Promise<Users> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async findOneByUsername(username: string): Promise<Users> {
    return this.userRepository.findOne({
      where: { username },
    });
  }
}

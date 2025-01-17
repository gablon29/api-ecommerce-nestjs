import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Users } from './user.entity';
import * as bcry from 'bcrypt';
import { UserDto } from './userDto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private dataSource: DataSource,
    @Inject(ConfigService) private configService: ConfigService,
  ) {}

  async createUser(user: Omit<UserDto, 'id'>): Promise<Users> {
    const saltRound = this.configService.get<number>('PARSE_SALT_ROUND');
    try {
      return this.dataSource.transaction(async (manager: EntityManager) => {
        const userExists = await this.userRepository.findOne({
          where: { username: user.username },
        });
        if (userExists) {
          throw new HttpException(
            {
              status: 400,
              error: 'El usuario ya existe',
            },
            400,
          );
        } else {
          const salt = await bcry.genSalt(saltRound);
          const hashedPassword = await bcry.hash(user.password, salt);
          const newUser = this.userRepository.create({
            name: user.name,
            username: user.username,
            password: hashedPassword,
          });
          return manager.save(newUser);
        }
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          status: 400,
          error: 'Error en la operacion',
        },
        400,
      );
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

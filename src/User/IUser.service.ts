import { UserDto } from './userDto';
import { Users } from './user.entity';

export interface IUserService {
  createUser(user: UserDto): Promise<Users>;
  findOneById(id: string): Promise<Users>;
  findOneByUsername(username: string): Promise<Users>;
  deleteUser(id: string): Promise<void>;
  updateUser(id: string, user: UserDto): Promise<Users>;
  findAll(): Promise<Users[]>;
}

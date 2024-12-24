import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getAllUser(): string {
    return 'Get all users!';
  }

  getUserById(userId: string): string {
    return `Get user with id ${userId}`;
  }
  createUser(user: any): string {
    return `User created with name: ${user.name}`;
  }
  updateUser(userId: string, user: any): string {
    return `User with id ${userId} updated with name: ${user.name}`;
  }
  deleteUser(userId: string): string {
    return `User with id ${userId} deleted`;
  }
}

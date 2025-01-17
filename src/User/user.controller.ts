import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './userDto';
import { Users } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() body: UserDto): Promise<Users> {
    return this.userService.createUser(body);
  }

  @Get()
  async getUserByName(@Query('name') name: string): Promise<Users> {
    const userFind = await this.userService.findOneById(name);
    if (!userFind) {
      throw new NotFoundException('User not found');
    }
    return userFind;
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './userDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUser(): string {
    return this.userService.getAllUser();
  }
  @Post()
  createUser(@Body() body: UserDto): string {
    return this.userService.createUser(body);
  }
}

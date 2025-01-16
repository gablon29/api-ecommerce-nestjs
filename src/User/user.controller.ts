import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
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

  @Get(':id')
  async getUserByName(@Param('id', ParseUUIDPipe) id: string): Promise<Users> {
    return this.userService.findOneById(id);
  }
}

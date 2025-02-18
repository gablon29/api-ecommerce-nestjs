import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './userDto';
import { Users } from './user.entity';
import { ApiResponse } from 'src/response/ApiResponse';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async createUser(@Body() body: UserDto): Promise<ApiResponse<Users>> {
    try {
      const user = await this.userService.createUser(body);
      return new ApiResponse<Users>(
        HttpStatus.CREATED,
        true,
        'User created',
        user,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  public async getUserByName(
    @Query('name') name: string,
  ): Promise<ApiResponse<Users>> {
    const userFind = await this.userService.findOneById(name);
    if (!userFind) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return new ApiResponse<Users>(HttpStatus.OK, true, 'User found', userFind);
  }
}

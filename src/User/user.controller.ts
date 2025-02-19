import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
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

  @Get('all')
  public async getAllUsers(): Promise<ApiResponse<Users[]>> {
    try {
      const users = await this.userService.findAll();
      return new ApiResponse<Users[]>(
        HttpStatus.OK,
        true,
        'Users found',
        users,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch('update/:id')
  public async updateUser(@Param('id') id: string, @Body() body: UserDto) {
    try {
      const user = await this.userService.updateUser(id, body);
      return new ApiResponse<Users>(HttpStatus.OK, true, 'User updated', user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch('delete/:id')
  public async deleteUser(@Param('id') id: string) {
    try {
      await this.userService.deleteUser(id);
      return new ApiResponse<Users>(HttpStatus.OK, true, 'User deleted', null);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

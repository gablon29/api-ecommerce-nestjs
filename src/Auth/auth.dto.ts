import { PickType } from '@nestjs/swagger';
import { UserDto } from 'src/User/userDto';

export class AuthDto extends PickType(UserDto, ['username', 'password']) {
  username: string;
  password: string;
}

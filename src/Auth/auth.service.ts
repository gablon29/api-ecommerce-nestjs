import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JsonWebTokenError } from '@nestjs/jwt';
import { AuthDto } from './auth.dto';
import { UserService } from 'src/User/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UserService,
  ) {}

  public async generateToken(userAuth: AuthDto): Promise<string> {
    const user = await this.userService.findOneByUsername(userAuth.username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordMatch = await this.comparePassword(
      userAuth.password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { id, username } = user;
    const token = this.jwtService.sign({
      sub: id,
      username,
    });
    return token;
  }

  public async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}

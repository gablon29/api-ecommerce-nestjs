import { Injectable } from '@nestjs/common';
import { JwtService, JsonWebTokenError } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public async validateUser(token: string): Promise<boolean> {
    return false;
  }

  public login(user: any): string {
    return `Welcome ${user.name}!`;
  }
}

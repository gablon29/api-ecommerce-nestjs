import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(user: any): string {
    return `Welcome ${user.name}!`;
  }
}

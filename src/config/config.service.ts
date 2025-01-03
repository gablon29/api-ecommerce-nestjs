import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigugaritionService {
  constructor(private configService: ConfigService) {}

  getHostDatabase(): string {
    return this.configService.get<string>('HOST_DATABASE');
  }
  getPortDatabase(): number {
    return this.configService.get<number>('PORT_DATABASE');
  }
  getUserDatabase(): string {
    return this.configService.get<string>('USER_DATABASE');
  }
  getNameDatabase(): string {
    return this.configService.get<string>('NAME_DATABASE');
  }
}

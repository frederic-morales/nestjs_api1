import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { ConfigService } from '@nestjs/config';
import { EnvModel } from './env.model';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService<EnvModel>,
  ) {}

  @Get()
  getHello(): string {
    const myVar = this.configService.get('MY_VAR', { infer: true });
    const message = this.appService.getHello();
    return `${message} ${myVar}`;
  }

  @Get('my-test')
  getMyTest() {
    return this.usersService.findAll();
  }
}

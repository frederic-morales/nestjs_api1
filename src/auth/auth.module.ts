import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UsersModule } from 'src/users/users.module'; 

import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { ConfigService } from '@nestjs/config';
import { EnvModel } from 'src/env.model';

import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (confgiService: ConfigService<EnvModel>) => ({
        secret: confgiService.get('JWT_SECRET', {infer: true}),
        signOptions: {expiresIn: '3h'}
      })
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"

import { User } from 'src/users/entities/user.entity';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string) {
        const user = await this.usersService.getUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException('User not found')
        }
        const isMatch = await bcrypt.compare(pass, user.password)
        if (!isMatch) {
            throw new UnauthorizedException('Unauthorizaded')
        }
        return user;
    }

    generateToken(user: User){
        const payload = {sub: user.id};
        return this.jwtService.sign(payload)
    }
}

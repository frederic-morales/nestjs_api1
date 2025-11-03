import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      name: 'John Doe 1',
      email: 'john.doe1@example.com',
      password: 'password',
    },
    {
      id: '2',
      name: 'Jane Doe 2',
      email: 'jane.doe2@example.com',
      password: 'password',
    },
    {
      id: '3',
      name: 'John Doe 3',
      email: 'john.doe3@example.com',
      password: 'password',
    },
  ];

  findAll() {
    return this.users;
  }

  getUserById(id: string) {
    const position = this.findOne(id);
    const user = this.users[position];
    if (user.id === '1') {
      throw new UnauthorizedException('You are not authorized to access this resource');
    }
    return user;
  }

  create(body: CreateUserDto) {
    const newUser = {
      ...body,
      id: `${new Date().getTime()}`,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, changes: UpdateUserDto) {
    const position = this.findOne(id);
    const currentUser = this.users[position];
    const updatedUser = { ...currentUser, ...changes };
    this.users[position] = updatedUser;
    return updatedUser;
  }

  delete(id: string) {
    const position = this.findOne(id);
    this.users.splice(position, 1);
    return { message: 'User deleted' };
  }

  private findOne(id: string) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return position;
  }
}

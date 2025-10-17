import { Controller, Get, Param } from '@nestjs/common';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

@Controller('users')
export class UsersController {
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

  @Get()
  getUsers(): User[] {
    return this.users;
  }

  @Get(':id')
  getUser(@Param('id') id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}

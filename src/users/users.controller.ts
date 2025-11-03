import { Controller, Get, Param, Body, Post, Delete, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Get()
  getUsers() {
    return this.UsersService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.UsersService.getUserById(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.UsersService.create(body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.UsersService.delete(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() changes: UpdateUserDto) {
    return this.UsersService.update(id, changes);
  }
}

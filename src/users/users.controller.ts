import { Controller, Get, Param, Body, Post, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Get()
  getUsers() {
    return this.UsersService.findAll();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.UsersService.getUserById(id);
  }

  @Get(':id/profile')
  getUserProfile(@Param('id', ParseIntPipe) id: number){
    return this.UsersService.getProfileByUserId(id)
  }

  @Get(':id/posts')
  getUserPosts(@Param('id', ParseIntPipe) id: number){
    return this.UsersService.getPostsByUserId(id)
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.UsersService.create(body);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.UsersService.delete(id);
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() changes: UpdateUserDto) {
    return this.UsersService.update(id, changes);
  }
}

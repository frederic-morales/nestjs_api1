import { ForbiddenException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.usersRepository.find({
      relations: ['profile'],
    });
    return users
  }

  async getUserById(id: number) {
    const user = await this.findOne(id)
    if (user.id === 1) {
      throw new ForbiddenException('You are not allowed to access this user')
    }
    return user;
  }

  async getProfileByUserId(id: number){
    const user = await this.findOne(id);
    return user.profile
  }

  async getPostsByUserId(id: number){
    const user = await this.usersRepository.findOne({
      where: {id},
      relations: ['posts']
    });
    return user?.posts;
  }

  async create(body: CreateUserDto) {
     try {
      const newUser = this.usersRepository.create(body);
      const savedUser = await this.usersRepository.save(newUser);
      return this.findOne(savedUser.id);
    } catch {
      throw new BadRequestException('Error creating user');
    }
  }

  async update(id: number, changes: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      console.log(changes);
      const updatedUser = this.usersRepository.merge(user, changes)
      console.log(updatedUser);
      const saveUser = await this.usersRepository.save(updatedUser);
      return saveUser;
    } catch (error) {
      throw new BadRequestException("Error updating user")
    }
  }

  async delete(id: number) {
    try {
      await this.usersRepository.delete(id)
      return { message: 'User deleted' };
    } catch (error) {
      throw new BadRequestException('Error deleting user')
    }
  }

  private async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: {id},
      relations: ['profile']
    })
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  // private async findUserProfile(id: number){
  //   const profile = await this.profileRepository.findOneBy({id})
  //   if (!profile) {
  //     throw new NotFoundException(`Profile with id ${id} not found`)
  //   }
  //   return profile;
  // }
}

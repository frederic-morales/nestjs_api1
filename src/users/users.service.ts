import { ForbiddenException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>
  ) {}

  async findAll() {
    const users = await this.usersRepository.find();
    return users
  }

  async getUserById(id: number) {
    const user = await this.findOne(id)
    if (user.id === 1) {
      throw new ForbiddenException('You are not allowed to access this user')
    }
    const userProfile = await this.findUserProfile(user?.profile?.id)
    return {
      ...user,
      profile: userProfile
    };
  }

  async create(body: CreateUserDto) {
     try {
      const newUser = await this.usersRepository.save(body);
      return newUser;
    } catch {
      throw new BadRequestException('Error creating user');
    }
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findOne(id);
    const updatedUser = this.usersRepository.merge(user, changes)
    return this.usersRepository.save(updatedUser);    
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    await this.usersRepository.delete(user.id)
    return { message: 'User deleted' };
  }

  private async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({id})
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  private async findUserProfile(id: number){
    const profile = await this.profileRepository.findOneBy({id})
    if (!profile) {
      throw new NotFoundException(`Profile with id ${id} not found`)
    }
    return profile;
  }
}

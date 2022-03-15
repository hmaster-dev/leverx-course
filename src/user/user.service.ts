import { Injectable } from '@nestjs/common';
import { UserServiceInterface } from './types/userService.interface';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.getAllUsers();
  }

  async getUserById(id: number): Promise<UserEntity> {
    return await this.userRepository.getUserById(id);
  }

  async getUserBy(query): Promise<UserEntity> {
    return await this.userRepository.getUserBy(query);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user: UserEntity = new UserEntity();
    Object.assign(user, createUserDto);
    return await this.userRepository.createUser(user);
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user: UserEntity = await this.getUserById(id);
    Object.assign(user, updateUserDto);
    return await this.userRepository.updateUser(user);
  }
}

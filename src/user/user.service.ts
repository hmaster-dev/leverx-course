import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserServiceInterface } from './types/userService.interface';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import StripeService from '../stripe/stripe.service';
import { AuthorEntity } from '../author/author.entity';
import { RecordEntity } from '../record/record.entity';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly stripeService: StripeService,
  ) {}

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.getAllUsers();
  }

  async getUserById(id: number): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.getUserById(id);
    if (!user) {
      throw new HttpException(`no user with ${id}`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getUserBy(query): Promise<UserEntity> {
    return await this.userRepository.getUserBy(query);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const stripeCustomer = await this.stripeService.createCustomer(
        createUserDto.firstName,
        createUserDto.email,
      );
      const user: UserEntity = new UserEntity();
      Object.assign(user, {
        ...createUserDto,
        stripeCustomerId: stripeCustomer.id,
      });
      return await this.userRepository.createUser(user);
    } catch (e) {
      throw new HttpException(`incorrect data of user`, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.getUserById(id);
      Object.assign(user, updateUserDto);
      return await this.userRepository.updateUser(user);
    } catch (e) {
      throw new HttpException(`incorrect data of user`, HttpStatus.BAD_REQUEST);
    }
  }
}

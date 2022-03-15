import { UserEntity } from '../user.entity';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';

export interface UserServiceInterface {
  getAllUsers(): Promise<UserEntity[]>;

  getUserById(id: number): Promise<UserEntity>;

  getUserBy(query): Promise<UserEntity>;

  createUser(createUserDto: CreateUserDto): Promise<UserEntity>;

  updateUser(id, updateUserDto: UpdateUserDto): Promise<UserEntity>;
}

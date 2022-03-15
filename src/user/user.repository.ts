import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.find();
  }

  async getUserById(id: number): Promise<UserEntity> {
    return await this.findOne(id);
  }

  async getUserBy(query): Promise<UserEntity> {
    return await this.findOne(query);
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    return await this.save(user);
  }

  async updateUser(user: UserEntity): Promise<UserEntity> {
    return await this.save(user);
  }
}

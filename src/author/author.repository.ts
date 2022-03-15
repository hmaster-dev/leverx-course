import { EntityRepository, Repository } from 'typeorm';
import { AuthorEntity } from './author.entity';
import { CreateAuthorDto } from './dto/createAuthor.dto';

@EntityRepository(AuthorEntity)
export class AuthorRepository extends Repository<AuthorEntity> {
  async getAllAuthors(): Promise<AuthorEntity[]> {
    return await this.find();
  }

  async getAuthorById(id: number): Promise<AuthorEntity> {
    return await this.findOne(id);
  }

  async createAuthor(author: AuthorEntity): Promise<AuthorEntity> {
    return await this.save(author);
  }
}

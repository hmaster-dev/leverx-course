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

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<AuthorEntity> {
    const author: AuthorEntity = new AuthorEntity();
    Object.assign(author, createAuthorDto);
    return await this.save(author);
  }
}

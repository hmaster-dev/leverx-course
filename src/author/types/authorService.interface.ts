import { AuthorEntity } from '../author.entity';
import { CreateAuthorDto } from '../dto/createAuthor.dto';

export interface AuthorServiceInterface {
  getAllAuthors(): Promise<AuthorEntity[]>;

  getAuthorById(id: number): Promise<AuthorEntity>;

  createAuthor(createAuthorDto: CreateAuthorDto): Promise<AuthorEntity>;
}

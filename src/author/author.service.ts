import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthorServiceInterface } from './types/authorService.interface';
import { AuthorEntity } from './author.entity';
import { AuthorRepository } from './author.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuthorDto } from './dto/createAuthor.dto';

@Injectable()
export class AuthorService implements AuthorServiceInterface {
  constructor(
    @InjectRepository(AuthorRepository)
    private readonly authorRepository: AuthorRepository,
  ) {}

  async getAllAuthors(): Promise<AuthorEntity[]> {
    return await this.authorRepository.getAllAuthors();
  }

  async getAuthorById(id: number): Promise<AuthorEntity> {
    const author: AuthorEntity = await this.authorRepository.getAuthorById(id);
    if (!author) {
      throw new HttpException(`no author with ${id}`, HttpStatus.NOT_FOUND);
    }
    return author;
  }

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<AuthorEntity> {
    try {
      const author: AuthorEntity = new AuthorEntity();
      Object.assign(author, createAuthorDto);
      return await this.authorRepository.createAuthor(author);
    } catch (e) {
      throw new HttpException(
        `incorrect data of author`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

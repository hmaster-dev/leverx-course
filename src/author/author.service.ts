import { Injectable } from '@nestjs/common';
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
    return await this.authorRepository.getAuthorById(id);
  }

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<AuthorEntity> {
    const author: AuthorEntity = new AuthorEntity();
    Object.assign(author, createAuthorDto);
    return await this.authorRepository.createAuthor(author);
  }
}

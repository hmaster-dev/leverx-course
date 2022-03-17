import { Test } from '@nestjs/testing';
import { AuthorRepository } from '../author.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthorEntity } from '../author.entity';
import { authorStub } from './stubs/author.stub';
import { AuthorService } from '../author.service';

describe('AuthorService', () => {
  let authorService: AuthorService;
  let authorRepository: AuthorRepository;

  beforeEach(async () => {
    const repositoryToken = getRepositoryToken(AuthorRepository);
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthorService,
        AuthorRepository,
        {
          provide: repositoryToken,
          useValue: {
            getAllAuthors: jest.fn(() => [authorStub()]),
            getAuthorById: jest.fn(() => authorStub()),
            createAuthor: jest.fn(() => authorStub()),
          },
        },
      ],
    }).compile();

    authorService = moduleRef.get<AuthorService>(AuthorService);
    authorRepository = moduleRef.get<AuthorRepository>(AuthorRepository);
    jest.clearAllMocks();
  });

  describe('AuthorService finds', () => {
    describe('getAllAuthors', () => {
      describe('when getAllAuthors is called', () => {
        let authors: AuthorEntity[];
        beforeEach(async () => {
          authors = await authorService.getAllAuthors();
        });
        test('then it should call getAllAuthors', () => {
          expect(authorRepository.getAllAuthors).toHaveBeenCalled();
        });
        test('then it should return an array of authors', () => {
          expect(authors).toEqual([authorStub()]);
        });
      });
    });

    describe('getAuthorById', () => {
      describe('when getAuthorById is called', () => {
        let author: AuthorEntity;
        beforeEach(async () => {
          author = await authorService.getAuthorById(authorStub().id);
        });
        test('then it should call getAuthorById', () => {
          expect(authorRepository.getAuthorById).toHaveBeenCalledWith(
            authorStub().id,
          );
        });
        test('then it should return an array of authors', () => {
          expect(author).toEqual(authorStub());
        });
      });
    });
  });

  describe('AuthorService saves', () => {
    describe('createAuthor', () => {
      describe('when createAuthor is called', () => {
        let author: AuthorEntity;
        beforeEach(async () => {
          author = await authorService.createAuthor(authorStub());
        });
        test('then it should call createAuthor', () => {
          expect(authorRepository.createAuthor).toHaveBeenCalledWith(
            authorStub(),
          );
        });
        test('then it should return an array of authors', () => {
          expect(author).toEqual(authorStub());
        });
      });
    });
  });
});

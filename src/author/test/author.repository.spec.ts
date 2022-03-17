import { Test } from '@nestjs/testing';
import { AuthorRepository } from '../author.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthorEntity } from '../author.entity';
import { authorStub } from './stubs/author.stub';

describe('AuthorRepository', () => {
  let authorRepository: AuthorRepository;

  beforeEach(async () => {
    const repositoryToken = getRepositoryToken(AuthorEntity);
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthorRepository,
        {
          provide: repositoryToken,
          useValue: {
            find: jest.fn(() => [authorStub()]),
            findOne: jest.fn(() => authorStub()),
            save: jest.fn(() => authorStub()),
          },
        },
      ],
    }).compile();

    authorRepository = moduleRef.get<AuthorRepository>(repositoryToken);
    jest.clearAllMocks();
  });

  describe('AuthorRepository finds', () => {
    describe('find', () => {
      describe('when find is called', () => {
        let authors: AuthorEntity[];
        let spyAuthors: jest.SpyInstance;
        beforeEach(async () => {
          spyAuthors = jest.spyOn(authorRepository, 'find');
          authors = await authorRepository.find();
        });
        test('then it should call find', () => {
          expect(spyAuthors).toHaveBeenCalled();
          expect(authorRepository.find).toHaveBeenCalled();
        });
        test('then it should return an array of authors', () => {
          expect(authors).toEqual([authorStub()]);
        });
      });
    });

    describe('findOne', () => {
      describe('when findOne is called', () => {
        let author: AuthorEntity;
        let spyAuthor: jest.SpyInstance;
        beforeEach(async () => {
          spyAuthor = jest.spyOn(authorRepository, 'findOne');
          author = await authorRepository.findOne(authorStub().id);
        });
        test('then it should call findOne', () => {
          expect(spyAuthor).toHaveBeenCalledWith(authorStub().id);
          expect(authorRepository.findOne).toHaveBeenCalledWith(
            authorStub().id,
          );
        });
        test('then it should return an array of authors', () => {
          expect(author).toEqual(authorStub());
        });
      });
    });
  });

  describe('AuthorRepository saves', () => {
    describe('save', () => {
      describe('when save is called', () => {
        let author: AuthorEntity;
        let spyAuthor: jest.SpyInstance;
        beforeEach(async () => {
          spyAuthor = jest.spyOn(authorRepository, 'save');
          author = await authorRepository.save(authorStub());
        });
        test('then it should call save', () => {
          expect(spyAuthor).toHaveBeenCalledWith(authorStub());
          expect(authorRepository.save).toHaveBeenCalledWith(authorStub());
        });
        test('then it should return an array of authors', () => {
          expect(author).toEqual(authorStub());
        });
      });
    });
  });
});

import { Test } from '@nestjs/testing';
import { AuthorRepository } from '../author.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthorEntity } from '../author.entity';
import { authorStub } from './stubs/author.stub';

describe('AuthorRepository', () => {
  let authorRepository: AuthorRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthorRepository,
        {
          provide: getRepositoryToken(AuthorEntity),
          useValue: {
            find: jest.fn((x) => [authorStub()]),
            findOne: jest.fn((x) => authorStub()),
            save: jest.fn(authorStub),
          },
        },
      ],
    }).compile();

    authorRepository = moduleRef.get<AuthorRepository>(
      getRepositoryToken(AuthorEntity),
    );
    jest.clearAllMocks();
  });

  describe('find', () => {
    describe('when find is called', () => {
      let authors: AuthorEntity[];
      beforeEach(async () => {
        jest.spyOn(authorRepository, 'find');
        authors = await authorRepository.find();
      });
      test('then it should call find', () => {
        expect(authorRepository.find);
      });
      test('then it should return an array of authors', () => {
        expect(authors).toEqual([authorStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let author: AuthorEntity;
      beforeEach(async () => {
        author = await authorRepository.findOne(authorStub().id);
      });
      test('then it should call findOne', () => {
        expect(authorRepository.findOne).toHaveBeenCalledWith(authorStub().id);
      });
      test('then it should return an array of authors', () => {
        expect(author).toEqual(authorStub());
      });
    });
  });

  describe('save', () => {
    describe('when save is called', () => {
      let author: AuthorEntity;
      beforeEach(async () => {
        author = await authorRepository.save(authorStub());
      });
      test('then it should call save', () => {
        expect(authorRepository.save).toHaveBeenCalledWith(authorStub());
      });
      test('then it should return an array of authors', () => {
        expect(author).toEqual(authorStub());
      });
    });
  });
});

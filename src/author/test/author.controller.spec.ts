import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from '../author.controller';
import { AuthorService } from '../author.service';
import { authorStub } from './stubs/author.stub';
import { AuthorEntity } from '../author.entity';

jest.mock('../author.service');

describe('AuthorController', () => {
  let authorController: AuthorController;
  let authorService: AuthorService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [AuthorService],
    }).compile();

    authorController = moduleRef.get<AuthorController>(AuthorController);
    authorService = moduleRef.get<AuthorService>(AuthorService);
    jest.clearAllMocks();
  });

  describe('AuthorController finds', () => {
    describe('when getAllAuthors is called', () => {
      let authors: AuthorEntity[];
      beforeEach(async () => {
        authors = await authorController.getAllAuthors();
      });
      test('then it should call authorService', () => {
        expect(authorService.getAllAuthors).toHaveBeenCalled();
      });
      test('then it should return an array of authors', () => {
        expect(authors).toEqual([authorStub()]);
      });
    });

    describe('when getAuthorById is called', () => {
      let author: AuthorEntity;
      beforeEach(async () => {
        author = await authorController.getAuthorById(authorStub().id);
      });
      test('then it should call authorService', () => {
        expect(authorService.getAuthorById).toBeCalledWith(authorStub().id);
      });
      test('then it should return an author', () => {
        expect(author).toEqual(authorStub());
      });
    });
  });

  describe('AuthorController saves', () => {
    describe('when createAuthor is called', () => {
      let author: AuthorEntity;
      beforeEach(async () => {
        author = await authorController.createAuthor({
          name: authorStub().name,
        });
      });
      test('then it should call authorService', () => {
        expect(authorService.createAuthor).toBeCalledWith({
          name: authorStub().name,
        });
      });
      test('then it should return an author', () => {
        expect(author).toEqual(authorStub());
      });
    });
  });
});

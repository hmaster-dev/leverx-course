import { authorStub } from '../test/stubs/author.stub';

export const AuthorService = jest.fn().mockReturnValue({
  getAllAuthors: jest.fn().mockResolvedValue([authorStub()]),
  getAuthorById: jest.fn().mockResolvedValue(authorStub()),
  createAuthor: jest.fn().mockResolvedValue(authorStub()),
});

import { AuthorEntity } from '../../author.entity';

export const authorStub = (): AuthorEntity => {
  return {
    id: 88,
    name: 'test Author',
    records: [],
  };
};

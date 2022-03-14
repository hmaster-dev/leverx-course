import { MigrationInterface, QueryRunner } from 'typeorm';
import { RecordEntity } from '../record/record.entity';
import { AuthorEntity } from '../author/author.entity';

export class CreateAuthorAndRecord1647264231025 implements MigrationInterface {
  name = 'CreateAuthorAndRecord1647264231025';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "records" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "price" integer NOT NULL, "authorId" integer, CONSTRAINT "PK_188149422ee2454660abf1d5ee5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "authors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_d2ed02fabd9b52847ccb85e6b88" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "records" ADD CONSTRAINT "FK_447389c0c9dcc190dc22a379e81" FOREIGN KEY ("authorId") REFERENCES "authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    // create authors and records
    const authorsCount = 13;
    const recordsCount = 50;
    const authors: AuthorEntity[] = [];
    for (let i = 1; i <= authorsCount; i++) {
      const author: AuthorEntity = new AuthorEntity();
      Object.assign(author, {
        id: i,
        name: 'Author ' + i,
        records: [],
      });
      authors.push(author);
    }
    await queryRunner.manager.insert(AuthorEntity, authors);
    for (let i = 1; i <= recordsCount; i++) {
      const record: RecordEntity = new RecordEntity();
      const authorIndex: number = Math.round(
        0 - 0.5 + Math.random() * (12 + 1),
      );
      const price: number = Math.round(
        33 - 0.5 + Math.random() * (107 - 33 + 1),
      );
      Object.assign(record, {
        id: i,
        name: 'Record ' + i,
        description: 'Description of record ' + i,
        image: 'upload\\6473557c3c7105e47e82f1066220b39f8f.png',
        price: price,
        author: authors[authorIndex],
      });
      await queryRunner.manager.save(record);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "records" DROP CONSTRAINT "FK_447389c0c9dcc190dc22a379e81"`,
    );
    await queryRunner.query(`DROP TABLE "authors"`);
    await queryRunner.query(`DROP TABLE "records"`);
  }
}

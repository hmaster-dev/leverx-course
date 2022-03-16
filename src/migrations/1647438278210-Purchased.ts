import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { AuthorEntity } from '../author/author.entity';
import { RecordEntity } from '../record/record.entity';

export class Purchased1647438278210 implements MigrationInterface {
  name = 'Purchased1647438278210';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "googleId" character varying NOT NULL, "email" character varying NOT NULL, "firstName" character varying NOT NULL DEFAULT '', "lastName" character varying NOT NULL DEFAULT '', "birthDate" character varying NOT NULL DEFAULT '', "avatar" character varying NOT NULL DEFAULT '', "isAdmin" boolean NOT NULL DEFAULT false, "stripeCustomerId" character varying NOT NULL DEFAULT '', CONSTRAINT "UQ_f382af58ab36057334fb262efd5" UNIQUE ("googleId"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reviews" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "recordId" integer, "userId" integer, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "records" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "price" integer NOT NULL, "authorId" integer, CONSTRAINT "PK_188149422ee2454660abf1d5ee5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "authors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_d2ed02fabd9b52847ccb85e6b88" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_purchased_records" ("usersId" integer NOT NULL, "recordsId" integer NOT NULL, CONSTRAINT "PK_af1c219ca1913d6dadfaf9d429f" PRIMARY KEY ("usersId", "recordsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_21609255a465786d7ecc7df151" ON "users_purchased_records" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_454bb23a55a6c8f7b4320c6043" ON "users_purchased_records" ("recordsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_74e13a034a6b5ba4c4d09832dd5" FOREIGN KEY ("recordId") REFERENCES "records"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "records" ADD CONSTRAINT "FK_447389c0c9dcc190dc22a379e81" FOREIGN KEY ("authorId") REFERENCES "authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_purchased_records" ADD CONSTRAINT "FK_21609255a465786d7ecc7df1513" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_purchased_records" ADD CONSTRAINT "FK_454bb23a55a6c8f7b4320c60431" FOREIGN KEY ("recordsId") REFERENCES "records"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    const admin: UserEntity = new UserEntity();
    Object.assign(admin, {
      id: 1,
      googleId: '104600326424730005698',
      email: 'shustart@gmail.com',
      firstName: 'Artem',
      lastName: 'Shustov',
      birthDate: '',
      avatar:
        'https://lh3.googleusercontent.com/a-/AOh14GhV_tkg4iU2kOXpvPeKvNv0wIrna_Mfp2hdwIf83Q=s96-c',
      isAdmin: true,
    });
    await queryRunner.manager.save(admin);
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
      `ALTER TABLE "users_purchased_records" DROP CONSTRAINT "FK_454bb23a55a6c8f7b4320c60431"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_purchased_records" DROP CONSTRAINT "FK_21609255a465786d7ecc7df1513"`,
    );
    await queryRunner.query(
      `ALTER TABLE "records" DROP CONSTRAINT "FK_447389c0c9dcc190dc22a379e81"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_74e13a034a6b5ba4c4d09832dd5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_454bb23a55a6c8f7b4320c6043"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_21609255a465786d7ecc7df151"`,
    );
    await queryRunner.query(`DROP TABLE "users_purchased_records"`);
    await queryRunner.query(`DROP TABLE "authors"`);
    await queryRunner.query(`DROP TABLE "records"`);
    await queryRunner.query(`DROP TABLE "reviews"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReview1647364259339 implements MigrationInterface {
  name = 'CreateReview1647364259339';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "reviews" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "recordId" integer, "userId" integer, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_74e13a034a6b5ba4c4d09832dd5" FOREIGN KEY ("recordId") REFERENCES "records"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_74e13a034a6b5ba4c4d09832dd5"`,
    );
    await queryRunner.query(`DROP TABLE "reviews"`);
  }
}

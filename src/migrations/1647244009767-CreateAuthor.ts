import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAuthor1647244009767 implements MigrationInterface {
    name = 'CreateAuthor1647244009767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "records" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "price" integer NOT NULL, "authorNameId" integer, CONSTRAINT "PK_188149422ee2454660abf1d5ee5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "authors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_d2ed02fabd9b52847ccb85e6b88" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_8a53b3c52c89d1230a397374da4" FOREIGN KEY ("authorNameId") REFERENCES "authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_8a53b3c52c89d1230a397374da4"`);
        await queryRunner.query(`DROP TABLE "authors"`);
        await queryRunner.query(`DROP TABLE "records"`);
    }

}

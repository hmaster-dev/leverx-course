import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '../user/user.entity';

export class CreateUser1647338502298 implements MigrationInterface {
  name = 'CreateUser1647338502298';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "googleId" character varying NOT NULL, "email" character varying NOT NULL, "firstName" character varying NOT NULL DEFAULT '', "lastName" character varying NOT NULL DEFAULT '', "birthDate" character varying NOT NULL DEFAULT '', "avatar" character varying NOT NULL DEFAULT '', CONSTRAINT "UQ_f382af58ab36057334fb262efd5" UNIQUE ("googleId"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
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
    });
    await queryRunner.manager.save(admin);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}

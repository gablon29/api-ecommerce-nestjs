import { MigrationInterface, QueryRunner } from 'typeorm';

export class BorradoLogico1740003315928 implements MigrationInterface {
  name = 'BorradoLogico1740003315928';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
  }
}

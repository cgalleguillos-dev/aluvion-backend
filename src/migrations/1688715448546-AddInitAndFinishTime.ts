import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInitAndFinishTime1688715448546 implements MigrationInterface {
    name = 'AddInitAndFinishTime1688715448546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "time"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "startTime" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" ADD "endTime" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "endTime"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "startTime"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "time" integer NOT NULL`);
    }

}

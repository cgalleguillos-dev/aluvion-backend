import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUuidToString1691735556936 implements MigrationInterface {
    name = 'ChangeUuidToString1691735556936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_4c651ee6e15c56309721dbcd5c6"`);
        await queryRunner.query(`ALTER TABLE "compose_component" DROP CONSTRAINT "FK_b254e35a4660eea6e62dbb2e1b5"`);
        await queryRunner.query(`ALTER TABLE "arduino" DROP CONSTRAINT "PK_c084eb910c62eea1f99558d84b2"`);
        await queryRunner.query(`ALTER TABLE "arduino" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "arduino" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "arduino" ADD CONSTRAINT "PK_c084eb910c62eea1f99558d84b2" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "compose_component" DROP COLUMN "arduinoId"`);
        await queryRunner.query(`ALTER TABLE "compose_component" ADD "arduinoId" character varying`);
        await queryRunner.query(`ALTER TABLE "component" DROP COLUMN "arduinoId"`);
        await queryRunner.query(`ALTER TABLE "component" ADD "arduinoId" character varying`);
        await queryRunner.query(`ALTER TABLE "compose_component" ADD CONSTRAINT "FK_b254e35a4660eea6e62dbb2e1b5" FOREIGN KEY ("arduinoId") REFERENCES "arduino"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_4c651ee6e15c56309721dbcd5c6" FOREIGN KEY ("arduinoId") REFERENCES "arduino"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_4c651ee6e15c56309721dbcd5c6"`);
        await queryRunner.query(`ALTER TABLE "compose_component" DROP CONSTRAINT "FK_b254e35a4660eea6e62dbb2e1b5"`);
        await queryRunner.query(`ALTER TABLE "component" DROP COLUMN "arduinoId"`);
        await queryRunner.query(`ALTER TABLE "component" ADD "arduinoId" uuid`);
        await queryRunner.query(`ALTER TABLE "compose_component" DROP COLUMN "arduinoId"`);
        await queryRunner.query(`ALTER TABLE "compose_component" ADD "arduinoId" uuid`);
        await queryRunner.query(`ALTER TABLE "arduino" DROP CONSTRAINT "PK_c084eb910c62eea1f99558d84b2"`);
        await queryRunner.query(`ALTER TABLE "arduino" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "arduino" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "arduino" ADD CONSTRAINT "PK_c084eb910c62eea1f99558d84b2" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "compose_component" ADD CONSTRAINT "FK_b254e35a4660eea6e62dbb2e1b5" FOREIGN KEY ("arduinoId") REFERENCES "arduino"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_4c651ee6e15c56309721dbcd5c6" FOREIGN KEY ("arduinoId") REFERENCES "arduino"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

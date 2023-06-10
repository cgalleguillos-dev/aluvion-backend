import { MigrationInterface, QueryRunner } from "typeorm";

export class AddArduino1686440549586 implements MigrationInterface {
    name = 'AddArduino1686440549586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_5ada55cd985b0f18d8e7d35c7a4"`);
        await queryRunner.query(`ALTER TABLE "component" RENAME COLUMN "baseEquipmentId" TO "arduinoId"`);
        await queryRunner.query(`CREATE TABLE "arduino" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "baseEquipmentId" uuid, CONSTRAINT "PK_c084eb910c62eea1f99558d84b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "arduino" ADD CONSTRAINT "FK_ad0a5432cdea66a1b093289dbe2" FOREIGN KEY ("baseEquipmentId") REFERENCES "base_equipment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_4c651ee6e15c56309721dbcd5c6" FOREIGN KEY ("arduinoId") REFERENCES "arduino"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_4c651ee6e15c56309721dbcd5c6"`);
        await queryRunner.query(`ALTER TABLE "arduino" DROP CONSTRAINT "FK_ad0a5432cdea66a1b093289dbe2"`);
        await queryRunner.query(`DROP TABLE "arduino"`);
        await queryRunner.query(`ALTER TABLE "component" RENAME COLUMN "arduinoId" TO "baseEquipmentId"`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_5ada55cd985b0f18d8e7d35c7a4" FOREIGN KEY ("baseEquipmentId") REFERENCES "base_equipment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

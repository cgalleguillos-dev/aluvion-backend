import { MigrationInterface, QueryRunner } from "typeorm";

export class EditCompositePattern1686789949735 implements MigrationInterface {
    name = 'EditCompositePattern1686789949735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "type_component" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_14e977ee2574695d075be00f3be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "compose_component" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "typeComponentId" integer, "equipmentId" uuid, "arduinoId" uuid, CONSTRAINT "PK_e0cd68166c991159d20d9467da9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "component" ADD "typeComponentId" integer`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_bab42db5174e6e40b65e2dd3e95" FOREIGN KEY ("typeComponentId") REFERENCES "type_component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "compose_component" ADD CONSTRAINT "FK_ba1b4a5b3ace99d37d9fdbc4f17" FOREIGN KEY ("typeComponentId") REFERENCES "type_component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "compose_component" ADD CONSTRAINT "FK_e402c916af0664cd9b481196077" FOREIGN KEY ("equipmentId") REFERENCES "equipment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "compose_component" ADD CONSTRAINT "FK_b254e35a4660eea6e62dbb2e1b5" FOREIGN KEY ("arduinoId") REFERENCES "arduino"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "compose_component" DROP CONSTRAINT "FK_b254e35a4660eea6e62dbb2e1b5"`);
        await queryRunner.query(`ALTER TABLE "compose_component" DROP CONSTRAINT "FK_e402c916af0664cd9b481196077"`);
        await queryRunner.query(`ALTER TABLE "compose_component" DROP CONSTRAINT "FK_ba1b4a5b3ace99d37d9fdbc4f17"`);
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_bab42db5174e6e40b65e2dd3e95"`);
        await queryRunner.query(`ALTER TABLE "component" DROP COLUMN "typeComponentId"`);
        await queryRunner.query(`DROP TABLE "compose_component"`);
        await queryRunner.query(`DROP TABLE "type_component"`);
    }

}

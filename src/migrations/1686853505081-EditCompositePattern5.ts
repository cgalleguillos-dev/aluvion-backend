import { MigrationInterface, QueryRunner } from "typeorm";

export class EditCompositePattern51686853505081 implements MigrationInterface {
    name = 'EditCompositePattern51686853505081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "base_component" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "typeComponentId" integer, "arduinoId" uuid, CONSTRAINT "PK_dc00acc9298f2c03cd8a7cc023c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "base_component" ADD CONSTRAINT "FK_1a266ae0114f25fe7bdd906cd6d" FOREIGN KEY ("typeComponentId") REFERENCES "type_component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "base_component" ADD CONSTRAINT "FK_31fd4f88657a9d1adeae689aaf8" FOREIGN KEY ("arduinoId") REFERENCES "arduino"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "base_component" DROP CONSTRAINT "FK_31fd4f88657a9d1adeae689aaf8"`);
        await queryRunner.query(`ALTER TABLE "base_component" DROP CONSTRAINT "FK_1a266ae0114f25fe7bdd906cd6d"`);
        await queryRunner.query(`DROP TABLE "base_component"`);
    }

}

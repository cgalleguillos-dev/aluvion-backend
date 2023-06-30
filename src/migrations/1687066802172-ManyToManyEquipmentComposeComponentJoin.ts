import { MigrationInterface, QueryRunner } from "typeorm";

export class ManyToManyEquipmentComposeComponentJoin1687066802172 implements MigrationInterface {
    name = 'ManyToManyEquipmentComposeComponentJoin1687066802172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "compose_component_equipments_equipment" ("composeComponentId" uuid NOT NULL, "equipmentId" uuid NOT NULL, CONSTRAINT "PK_2c0422153d2433f63da3eba2940" PRIMARY KEY ("composeComponentId", "equipmentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b7a6933760bc8b97190390fb45" ON "compose_component_equipments_equipment" ("composeComponentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_99856a507701fec335fc446686" ON "compose_component_equipments_equipment" ("equipmentId") `);
        await queryRunner.query(`ALTER TABLE "compose_component_equipments_equipment" ADD CONSTRAINT "FK_b7a6933760bc8b97190390fb455" FOREIGN KEY ("composeComponentId") REFERENCES "compose_component"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "compose_component_equipments_equipment" ADD CONSTRAINT "FK_99856a507701fec335fc446686e" FOREIGN KEY ("equipmentId") REFERENCES "equipment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "compose_component_equipments_equipment" DROP CONSTRAINT "FK_99856a507701fec335fc446686e"`);
        await queryRunner.query(`ALTER TABLE "compose_component_equipments_equipment" DROP CONSTRAINT "FK_b7a6933760bc8b97190390fb455"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_99856a507701fec335fc446686"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b7a6933760bc8b97190390fb45"`);
        await queryRunner.query(`DROP TABLE "compose_component_equipments_equipment"`);
    }

}

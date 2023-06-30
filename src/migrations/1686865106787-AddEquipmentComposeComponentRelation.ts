import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEquipmentComposeComponentRelation1686865106787 implements MigrationInterface {
    name = 'AddEquipmentComposeComponentRelation1686865106787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "compose_component" ADD "equipmentId" uuid`);
        await queryRunner.query(`ALTER TABLE "compose_component" ADD CONSTRAINT "FK_e402c916af0664cd9b481196077" FOREIGN KEY ("equipmentId") REFERENCES "equipment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "compose_component" DROP CONSTRAINT "FK_e402c916af0664cd9b481196077"`);
        await queryRunner.query(`ALTER TABLE "compose_component" DROP COLUMN "equipmentId"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class EditCompositePattern31686791279568 implements MigrationInterface {
    name = 'EditCompositePattern31686791279568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "compose_component" DROP CONSTRAINT "FK_e402c916af0664cd9b481196077"`);
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_46760af45c9c6699f6dfda04678"`);
        await queryRunner.query(`ALTER TABLE "compose_component" DROP COLUMN "equipmentId"`);
        await queryRunner.query(`ALTER TABLE "component" DROP COLUMN "equipmentId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "component" ADD "equipmentId" uuid`);
        await queryRunner.query(`ALTER TABLE "compose_component" ADD "equipmentId" uuid`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_46760af45c9c6699f6dfda04678" FOREIGN KEY ("equipmentId") REFERENCES "equipment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "compose_component" ADD CONSTRAINT "FK_e402c916af0664cd9b481196077" FOREIGN KEY ("equipmentId") REFERENCES "equipment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

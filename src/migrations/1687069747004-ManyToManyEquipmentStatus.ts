import { MigrationInterface, QueryRunner } from "typeorm";

export class ManyToManyEquipmentStatus1687069747004 implements MigrationInterface {
    name = 'ManyToManyEquipmentStatus1687069747004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "equipment" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "isActive"`);
    }

}

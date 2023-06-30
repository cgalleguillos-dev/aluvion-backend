import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteComposite1686858722393 implements MigrationInterface {
    name = 'DeleteComposite1686858722393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pin" DROP CONSTRAINT "FK_708e754f67e0319e7f2e7b0676f"`);
        await queryRunner.query(`ALTER TABLE "pin" ADD "composeComponentId" uuid`);
        await queryRunner.query(`ALTER TABLE "pin" ADD CONSTRAINT "FK_708e754f67e0319e7f2e7b0676f" FOREIGN KEY ("componentId") REFERENCES "component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pin" ADD CONSTRAINT "FK_a18533ebdcadc77ca442b4b9dbb" FOREIGN KEY ("composeComponentId") REFERENCES "compose_component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pin" DROP CONSTRAINT "FK_a18533ebdcadc77ca442b4b9dbb"`);
        await queryRunner.query(`ALTER TABLE "pin" DROP CONSTRAINT "FK_708e754f67e0319e7f2e7b0676f"`);
        await queryRunner.query(`ALTER TABLE "pin" DROP COLUMN "composeComponentId"`);
        await queryRunner.query(`ALTER TABLE "pin" ADD CONSTRAINT "FK_708e754f67e0319e7f2e7b0676f" FOREIGN KEY ("componentId") REFERENCES "base_component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

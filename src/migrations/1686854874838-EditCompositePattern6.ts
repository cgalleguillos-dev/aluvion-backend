import { MigrationInterface, QueryRunner } from "typeorm";

export class EditCompositePattern61686854874838 implements MigrationInterface {
    name = 'EditCompositePattern61686854874838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pin" DROP CONSTRAINT "FK_708e754f67e0319e7f2e7b0676f"`);
        await queryRunner.query(`ALTER TABLE "pin" ADD CONSTRAINT "FK_708e754f67e0319e7f2e7b0676f" FOREIGN KEY ("componentId") REFERENCES "base_component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pin" DROP CONSTRAINT "FK_708e754f67e0319e7f2e7b0676f"`);
        await queryRunner.query(`ALTER TABLE "pin" ADD CONSTRAINT "FK_708e754f67e0319e7f2e7b0676f" FOREIGN KEY ("componentId") REFERENCES "component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

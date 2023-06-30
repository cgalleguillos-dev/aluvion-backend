import { MigrationInterface, QueryRunner } from "typeorm";

export class EditCompositePattern21686790239836 implements MigrationInterface {
    name = 'EditCompositePattern21686790239836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "component" ADD "composeComponentId" uuid`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_f9c3f5470a0721540c66c943b65" FOREIGN KEY ("composeComponentId") REFERENCES "compose_component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_f9c3f5470a0721540c66c943b65"`);
        await queryRunner.query(`ALTER TABLE "component" DROP COLUMN "composeComponentId"`);
    }

}

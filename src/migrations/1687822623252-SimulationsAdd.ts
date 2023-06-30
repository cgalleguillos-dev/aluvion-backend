import { MigrationInterface, QueryRunner } from "typeorm";

export class SimulationsAdd1687822623252 implements MigrationInterface {
    name = 'SimulationsAdd1687822623252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "composeComponentId" uuid`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_4b389639bcca550319700b9a162" FOREIGN KEY ("composeComponentId") REFERENCES "compose_component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_4b389639bcca550319700b9a162"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "composeComponentId"`);
    }

}

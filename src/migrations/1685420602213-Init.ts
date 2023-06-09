import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1685420602213 implements MigrationInterface {
    name = 'Init1685420602213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comunicationType" character varying NOT NULL, "signalType" character varying NOT NULL, "pinNumber" integer NOT NULL, "componentId" uuid, CONSTRAINT "PK_63a05514d6764193f9dde04bae0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "intensity" integer NOT NULL, "time" integer NOT NULL, "simulationId" uuid, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "simulation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "equipmentId" uuid, CONSTRAINT "PK_4b32674039366f76e42c51a2e9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "equipment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "baseEquipmentId" uuid, CONSTRAINT "PK_0722e1b9d6eb19f5874c1678740" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "base_equipment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, CONSTRAINT "PK_beb4c3bc3f0aecc4bfd9913e61b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "component" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "equipmentId" uuid, "baseEquipmentId" uuid, CONSTRAINT "PK_c084eba2d3b157314de79135f09" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pin" ADD CONSTRAINT "FK_708e754f67e0319e7f2e7b0676f" FOREIGN KEY ("componentId") REFERENCES "component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_e4859b29a8bc91b553a0e3f1532" FOREIGN KEY ("simulationId") REFERENCES "simulation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "simulation" ADD CONSTRAINT "FK_da1f253688b59a389e29a74a6ea" FOREIGN KEY ("equipmentId") REFERENCES "equipment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD CONSTRAINT "FK_ccc0df7e83c6b64c4db271fc210" FOREIGN KEY ("baseEquipmentId") REFERENCES "base_equipment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_46760af45c9c6699f6dfda04678" FOREIGN KEY ("equipmentId") REFERENCES "equipment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_5ada55cd985b0f18d8e7d35c7a4" FOREIGN KEY ("baseEquipmentId") REFERENCES "base_equipment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_5ada55cd985b0f18d8e7d35c7a4"`);
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_46760af45c9c6699f6dfda04678"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP CONSTRAINT "FK_ccc0df7e83c6b64c4db271fc210"`);
        await queryRunner.query(`ALTER TABLE "simulation" DROP CONSTRAINT "FK_da1f253688b59a389e29a74a6ea"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_e4859b29a8bc91b553a0e3f1532"`);
        await queryRunner.query(`ALTER TABLE "pin" DROP CONSTRAINT "FK_708e754f67e0319e7f2e7b0676f"`);
        await queryRunner.query(`DROP TABLE "component"`);
        await queryRunner.query(`DROP TABLE "base_equipment"`);
        await queryRunner.query(`DROP TABLE "equipment"`);
        await queryRunner.query(`DROP TABLE "simulation"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "pin"`);
    }

}

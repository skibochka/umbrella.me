import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsers1617690923356 implements MigrationInterface {
    name = 'createUsers1617690923356'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "photo" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "status" boolean NOT NULL DEFAULT false, "intention" character varying, "location" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f2578043e491921209f5dadd080" UNIQUE ("phoneNumber"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE "user"');
    }
}

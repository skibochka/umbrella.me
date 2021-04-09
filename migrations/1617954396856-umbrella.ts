import { MigrationInterface, QueryRunner } from 'typeorm';

export class umbrella1617954396856 implements MigrationInterface {
    name = 'umbrella1617954396856'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "seeker_request" ("id" SERIAL NOT NULL, "volunteerId" integer NOT NULL, "seekerId" integer NOT NULL, "intention" character varying NOT NULL, "acceptedAt" bigint, CONSTRAINT "PK_92f9f8fb2535561d62fa86627ef" PRIMARY KEY ("id"))');
      await queryRunner.query('CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "photo" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "status" boolean NOT NULL DEFAULT false, "location" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f2578043e491921209f5dadd080" UNIQUE ("phoneNumber"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE "user"');
      await queryRunner.query('DROP TABLE "seeker_request"');
    }
}

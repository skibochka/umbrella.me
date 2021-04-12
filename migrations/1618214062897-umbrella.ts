import { MigrationInterface, QueryRunner } from 'typeorm';

export class umbrella1618214062897 implements MigrationInterface {
    name = 'umbrella1618214062897'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "frozen_user" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "phoneNumber" character varying NOT NULL, CONSTRAINT "PK_0ad147dace9d4e6401fa0253f7b" PRIMARY KEY ("id"))');
      await queryRunner.query('CREATE TABLE "seeker_request" ("id" SERIAL NOT NULL, "volunteerId" integer NOT NULL, "seekerId" integer NOT NULL, "intention" character varying NOT NULL, "acceptedAt" TIMESTAMP, CONSTRAINT "UQ_b5e159310d5637ea41f9e105cd6" UNIQUE ("volunteerId", "seekerId", "intention"), CONSTRAINT "PK_92f9f8fb2535561d62fa86627ef" PRIMARY KEY ("id"))');
      await queryRunner.query('CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "photo" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "status" boolean NOT NULL DEFAULT false, "strikes" integer NOT NULL DEFAULT \'0\', "location" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f2578043e491921209f5dadd080" UNIQUE ("phoneNumber"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE "user"');
      await queryRunner.query('DROP TABLE "seeker_request"');
      await queryRunner.query('DROP TABLE "frozen_user"');
    }
}

import {
  Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';

@Entity()
export class SeekerRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  volunteerId: number;

  @Column()
  seekerId: number;

  @Column()
  intention: string;

  @Column({ nullable: true })
  acceptedAt: number;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';

@Unique(['volunteerId', 'seekerId', 'intention'])
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
  acceptedAt: Date;
}

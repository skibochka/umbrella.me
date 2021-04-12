import {
  Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    photo: string;

    @Column({ unique: true })
    phoneNumber: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column({ default: false })
    status: boolean;

    @Column({ default: 0 })
    strikes: number;

    @Column({ nullable: true })
    location: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

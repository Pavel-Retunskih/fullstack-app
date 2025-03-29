import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ name: 'first_name', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', length: 100 })
  lastName: string;

  @Column('int')
  height: number;

  @Column('numeric', { precision: 5, scale: 2 })
  weight: number;

  @Column({ length: 10 })
  gender: 'male' | 'female';

  @Column({ length: 100 })
  residence: string;

  @Column('bytea', { nullable: true })
  photo: Buffer;

  @Column({ name: 'photo_mime_type', length: 30, nullable: true })
  photoMimeType: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ReviewEntity } from '../review/review.entity';
import { RecordEntity } from '../record/record.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column({ unique: true })
  googleId: string;
  @ApiProperty()
  @Column({ unique: true })
  email: string;
  @ApiProperty()
  @Column({ default: '' })
  firstName: string;
  @ApiProperty()
  @Column({ default: '' })
  lastName: string;
  @Column({ default: '' })
  birthDate: string;
  @Column({ default: '' })
  avatar: string;
  @Column({ default: false })
  isAdmin: boolean;
  @OneToMany(() => ReviewEntity, (review: ReviewEntity) => review.user, {
    eager: true,
  })
  reviews: ReviewEntity[];
  @Column({ default: '' })
  stripeCustomerId?: string;
  @ManyToMany(() => RecordEntity, { cascade: true, eager: true })
  @JoinTable()
  purchased: RecordEntity[];
}

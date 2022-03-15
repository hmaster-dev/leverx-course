import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ReviewEntity } from '../review/review.entity';

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
}

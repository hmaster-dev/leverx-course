import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AuthorEntity } from '../author/author.entity';
import { ReviewEntity } from '../review/review.entity';

@Entity({ name: 'records' })
export class RecordEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @ManyToOne(() => AuthorEntity, (author: AuthorEntity) => author.records, {
    eager: true,
  })
  author: AuthorEntity;
  @ApiProperty({ example: 'record' })
  @Column()
  name: string;
  @ApiProperty({ example: 'record description' })
  @Column()
  description: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  @Column()
  image: string;
  @ApiProperty()
  @Column()
  price: number;
  @OneToMany(() => ReviewEntity, (review: ReviewEntity) => review.record, {
    eager: true,
  })
  reviews: ReviewEntity[];
}

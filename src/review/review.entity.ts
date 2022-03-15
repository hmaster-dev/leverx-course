import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { RecordEntity } from '../record/record.entity';
import { UserEntity } from '../user/user.entity';

@Entity('reviews')
export class ReviewEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @ManyToOne(() => RecordEntity, (record: RecordEntity) => record.reviews)
  record: RecordEntity;
  @ApiProperty()
  @ManyToOne(() => UserEntity, (user: UserEntity) => user.reviews)
  user: UserEntity;
  @ApiProperty()
  @Column()
  text: string;
}

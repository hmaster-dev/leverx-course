import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecordEntity } from '../record/record.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'authors' })
export class AuthorEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column()
  name: string;
  @OneToMany(() => RecordEntity, (record: RecordEntity) => record.author)
  records: RecordEntity[];
}

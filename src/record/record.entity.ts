import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { AuthorEntity } from '../author/author.entity';

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
  // @Column()
  // review?: [];
}

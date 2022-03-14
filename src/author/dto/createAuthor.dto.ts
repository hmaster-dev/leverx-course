import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class CreateAuthorDto {
  @ApiProperty()
  @Column()
  name: string;
}

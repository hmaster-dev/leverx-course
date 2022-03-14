import { ApiProperty } from '@nestjs/swagger';

export class CreateRecordDto {
  @ApiProperty()
  authorId: number;
  @ApiProperty({ example: 'record' })
  name: string;
  @ApiProperty({ example: 'record description' })
  description: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  image: string;
  @ApiProperty()
  price: number;
}

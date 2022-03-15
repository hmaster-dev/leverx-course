import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty()
  @IsNotEmpty()
  recordId: number;
  @ApiProperty()
  @IsNotEmpty()
  text: string;
}

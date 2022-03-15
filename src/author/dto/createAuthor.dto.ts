import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}

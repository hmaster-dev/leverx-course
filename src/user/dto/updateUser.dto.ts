import { ApiProperty } from '@nestjs/swagger';
import { RecordEntity } from '../../record/record.entity';

export class UpdateUserDto {
  @ApiProperty()
  firstName?: string;
  @ApiProperty()
  lastName?: string;
  @ApiProperty()
  birthDate?: string;
  @ApiProperty()
  avatar?: string;
  purchased?: RecordEntity[];
}

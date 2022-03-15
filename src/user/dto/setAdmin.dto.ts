import { ApiProperty } from '@nestjs/swagger';
import { UpdateUserDto } from './updateUser.dto';

export class SetAdminDto extends UpdateUserDto {
  @ApiProperty()
  isAdmin: boolean;
}

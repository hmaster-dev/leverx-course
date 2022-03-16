import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChargeDto {
  @ApiProperty()
  @IsNotEmpty()
  paymentMethodId: string;
  @ApiProperty()
  @IsNumber()
  amount: number;
}

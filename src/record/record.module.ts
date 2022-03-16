import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordContoller } from './record.contoller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordRepository } from './record.repository';
import { AuthorModule } from '../author/author.module';
import { ReviewModule } from '../review/review.module';
import { UserModule } from '../user/user.module';
import StripeService from '../stripe/stripe.service';
import { SenderService } from '../sender/sender.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecordRepository]),
    UserModule,
    AuthorModule,
    ReviewModule,
  ],
  controllers: [RecordContoller],
  providers: [RecordService, StripeService, SenderService],
  exports: [RecordService],
})
export class RecordModule {}

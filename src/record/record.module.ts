import { forwardRef, Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordContoller } from './record.contoller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordRepository } from './record.repository';
import { AuthorService } from '../author/author.service';
import { AuthorRepository } from '../author/author.repository';
import { ReviewRepository } from '../review/review.repository';
import { AuthorModule } from '../author/author.module';
import { ReviewModule } from '../review/review.module';
import { ReviewService } from '../review/review.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecordRepository,
      AuthorRepository,
      ReviewRepository,
    ]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthorModule),
    forwardRef(() => ReviewModule),
  ],
  controllers: [RecordContoller],
  providers: [RecordService, ReviewService],
})
export class RecordModule {}

import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { UserRepository } from '../user/user.repository';
import { RecordRepository } from '../record/record.repository';
import { AuthorRepository } from '../author/author.repository';
import { UserModule } from '../user/user.module';
import { RecordModule } from '../record/record.module';
import { AuthorModule } from '../author/author.module';
import { UserService } from '../user/user.service';
import { RecordService } from '../record/record.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReviewRepository,
      UserRepository,
      AuthorRepository,
      RecordRepository,
    ]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthorModule),
    forwardRef(() => RecordModule),
  ],
  controllers: [ReviewController],
  providers: [ReviewService, RecordService],
})
export class ReviewModule {}

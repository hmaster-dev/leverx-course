import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewRepository } from './review.repository';
import { ReviewEntity } from './review.entity';
import { CreateReviewDto } from './dto/createReview.dto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { RecordEntity } from '../record/record.entity';
import { RecordService } from '../record/record.service';
import { ReviewServiceInterface } from './types/reviewService.interface';

@Injectable()
export class ReviewService implements ReviewServiceInterface {
  constructor(
    @InjectRepository(ReviewRepository)
    private readonly reviewRepository: ReviewRepository,
    private readonly userService: UserService,
    @Inject(forwardRef(() => RecordService))
    private readonly recordService: RecordService,
  ) {}

  async createReview(
    userId: number,
    createReviewDto: CreateReviewDto,
  ): Promise<ReviewEntity> {
    const review: ReviewEntity = new ReviewEntity();
    const user: UserEntity = await this.userService.getUserById(userId);
    const record: RecordEntity = await this.recordService.getRecordById(
      createReviewDto.recordId,
    );
    Object.assign(review, {
      user: user,
      record: record,
      text: createReviewDto.text,
    });
    return await this.reviewRepository.createReview(review);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewRepository } from './review.repository';
import { ReviewEntity } from './review.entity';
import { CreateReviewDto } from './dto/createReview.dto';
import { UserEntity } from '../user/user.entity';
import { RecordEntity } from '../record/record.entity';
import { ReviewServiceInterface } from './types/reviewService.interface';

@Injectable()
export class ReviewService implements ReviewServiceInterface {
  constructor(
    @InjectRepository(ReviewRepository)
    private readonly reviewRepository: ReviewRepository,
  ) {}

  async createReview(
    user: UserEntity,
    record: RecordEntity,
    createReviewDto: CreateReviewDto,
  ): Promise<ReviewEntity> {
    try {
      const review: ReviewEntity = new ReviewEntity();
      Object.assign(review, {
        user: user,
        record: record,
        text: createReviewDto.text,
      });
      return await this.reviewRepository.createReview(review);
    } catch (e) {
      throw new HttpException(
        `incorrect data of review`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

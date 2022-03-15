import { ReviewEntity } from '../review.entity';
import { CreateReviewDto } from '../dto/createReview.dto';

export interface ReviewServiceInterface {
  createReview(
    userId: number,
    createReviewDto: CreateReviewDto,
  ): Promise<ReviewEntity>;
}

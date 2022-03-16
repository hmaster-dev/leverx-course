import { ReviewEntity } from '../review.entity';
import { CreateReviewDto } from '../dto/createReview.dto';
import { UserEntity } from '../../user/user.entity';
import { RecordEntity } from '../../record/record.entity';

export interface ReviewServiceInterface {
  createReview(
    user: UserEntity,
    record: RecordEntity,
    createReviewDto: CreateReviewDto,
  ): Promise<ReviewEntity>;
}

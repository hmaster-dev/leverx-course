import { EntityRepository, Repository } from 'typeorm';
import { ReviewEntity } from './review.entity';

@EntityRepository(ReviewEntity)
export class ReviewRepository extends Repository<ReviewEntity> {
  async createReview(review: ReviewEntity): Promise<ReviewEntity> {
    return await this.save(review);
  }
}

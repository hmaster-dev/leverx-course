import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateReviewDto } from './dto/createReview.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ReviewEntity } from './review.entity';
import { User } from '../user/decorators/user.decorator';

@ApiTags('Отзывы')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: 'Создание отзыва' })
  @ApiResponse({ status: 200 })
  @ApiBody({ type: CreateReviewDto })
  @ApiBearerAuth('TOKEN')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @Post()
  async createAuhtor(
    @User('id') userId: number,
    @Body()
    createReviewDto: CreateReviewDto,
  ): Promise<ReviewEntity> {
    return await this.reviewService.createReview(userId, createReviewDto);
  }
}

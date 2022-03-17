import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RecordServiceInterface } from './types/recordService.interface';
import { RecordEntity } from './record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordRepository } from './record.repository';
import { CreateRecordDto } from './dto/createRecord.dto';
import { AuthorEntity } from '../author/author.entity';
import { AuthorService } from '../author/author.service';
import { ReviewService } from '../review/review.service';
import { CreateReviewDto } from '../review/dto/createReview.dto';
import { ReviewEntity } from '../review/review.entity';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import StripeService from '../stripe/stripe.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class RecordService implements RecordServiceInterface {
  constructor(
    @InjectRepository(RecordRepository)
    private readonly recordRepository: RecordRepository,
    private readonly authorService: AuthorService,
    private readonly userService: UserService,
    private readonly reviewService: ReviewService,
    private readonly stripeService: StripeService,
    private eventEmitter: EventEmitter2,
  ) {}

  async getAllRecords(sort: string): Promise<RecordEntity[]> {
    return await this.recordRepository.getAllRecords(sort);
  }

  async getRecordById(id: number): Promise<RecordEntity> {
    const record: RecordEntity = await this.recordRepository.getRecordById(id);
    if (!record) {
      throw new HttpException(`no record with id=${id}`, HttpStatus.NOT_FOUND);
    }
    return record;
  }

  async createRecord(
    createRecordDto: CreateRecordDto,
    image: string,
  ): Promise<RecordEntity> {
    try {
      const author: AuthorEntity = await this.authorService.getAuthorById(
        createRecordDto.authorId,
      );
      const record: RecordEntity = new RecordEntity();
      Object.assign(record, {
        author: author,
        image: image,
        name: createRecordDto.name,
        description: createRecordDto.description,
        price: createRecordDto.price,
      });
      return this.recordRepository.createRecord(record);
    } catch (e) {
      throw new HttpException(
        `incorrect data of record`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async searchRecords(query: string): Promise<RecordEntity[]> {
    return await this.recordRepository.searchRecords(query);
  }

  async createReview(
    userId: number,
    id: number,
    createReviewDto: CreateReviewDto,
  ): Promise<ReviewEntity> {
    const user: UserEntity = await this.userService.getUserById(userId);
    const record: RecordEntity = await this.getRecordById(id);
    return await this.reviewService.createReview(user, record, createReviewDto);
  }

  async createCharge(id: number, userId: number, stripeCustomerId: string) {
    const record: RecordEntity = await this.getRecordById(id);
    const payment = await this.stripeService.charge(
      record.price * 100,
      'pm_1KdwYR2eZvKYlo2CkiAkXtxW',
      stripeCustomerId,
    );
    if (payment && payment.id) {
      const user: UserEntity = await this.userService.getUserById(userId);
      let purchased = user.purchased;
      if (!purchased.length) {
        purchased = [];
      }
      purchased.push(record);
      await this.userService.updateUser(userId, {
        purchased: purchased,
      });
      this.eventEmitter.emit('purchase.created', { email: user.email });
    }
    return payment;
  }
}

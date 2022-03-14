import { Injectable } from '@nestjs/common';
import { RecordServiceInterface } from './types/recordService.interface';
import { RecordEntity } from './record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordRepository } from './record.repository';
import { CreateRecordDto } from './dto/createRecord.dto';
import { AuthorEntity } from '../author/author.entity';
import { AuthorService } from '../author/author.service';

@Injectable()
export class RecordService implements RecordServiceInterface {
  constructor(
    @InjectRepository(RecordRepository)
    private readonly recordRepository: RecordRepository,
    private readonly authorService: AuthorService,
  ) {}

  async getAllRecords(): Promise<RecordEntity[]> {
    return await this.recordRepository.getAllRecords();
  }

  async getRecordById(id: number): Promise<RecordEntity> {
    return await this.recordRepository.getRecordById(id);
  }

  async createRecord(
    createRecordDto: CreateRecordDto,
    image: string,
  ): Promise<RecordEntity> {
    const author: AuthorEntity = await this.authorService.getAuthorById(
      createRecordDto.authorId,
    );
    const record: RecordEntity = new RecordEntity();
    Object.assign(record, {
      authorName: author,
      image: image,
      name: createRecordDto.name,
      description: createRecordDto.description,
      price: createRecordDto.price,
    });
    return this.recordRepository.createRecord(record);
  }
}

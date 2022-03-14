import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordContoller } from './record.contoller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordRepository } from './record.repository';
import { AuthorService } from '../author/author.service';
import { AuthorRepository } from '../author/author.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RecordRepository, AuthorRepository])],
  controllers: [RecordContoller],
  providers: [RecordService, AuthorService],
})
export class RecordModule {}

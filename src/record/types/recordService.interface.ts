import { RecordEntity } from '../record.entity';
import { CreateRecordDto } from '../dto/createRecord.dto';

export interface RecordServiceInterface {
  getAllRecords(sort: string): Promise<RecordEntity[]>;

  getRecordById(id: number): Promise<RecordEntity>;

  createRecord(createRecordDto: CreateRecordDto, image): Promise<RecordEntity>;

  searchRecords(query: string): Promise<any[]>;
}

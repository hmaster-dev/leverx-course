import { RecordEntity } from '../record.entity';
import { CreateRecordDto } from '../dto/createRecord.dto';

export interface RecordServiceInterface {
  getAllRecords(): Promise<RecordEntity[]>;

  getRecordById(id: number): Promise<RecordEntity>;

  createRecord(createRecordDto: CreateRecordDto, image): Promise<RecordEntity>;
}

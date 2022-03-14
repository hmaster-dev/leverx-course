import { EntityRepository, Repository } from 'typeorm';
import { RecordEntity } from './record.entity';

@EntityRepository(RecordEntity)
export class RecordRepository extends Repository<RecordEntity> {
  async getAllRecords(): Promise<RecordEntity[]> {
    return await this.find();
  }

  async getRecordById(id: number): Promise<RecordEntity> {
    return await this.findOne(id);
  }

  async createRecord(record: RecordEntity): Promise<RecordEntity> {
    return await this.save(record);
  }
}

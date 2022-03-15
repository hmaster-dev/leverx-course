import { EntityRepository, getRepository, Repository } from 'typeorm';
import { RecordEntity } from './record.entity';

@EntityRepository(RecordEntity)
export class RecordRepository extends Repository<RecordEntity> {
  async getAllRecords(sort: string): Promise<RecordEntity[]> {
    let options = {};
    if (sort) {
      options = { order: { price: sort.toUpperCase() } };
    }
    return await this.find(options);
  }

  async getRecordById(id: number): Promise<RecordEntity> {
    return await this.findOne(id);
  }

  async createRecord(record: RecordEntity): Promise<RecordEntity> {
    return await this.save(record);
  }

  async searchRecords(query: string): Promise<any[]> {
    const records: RecordEntity[] = [];
    const dataByName = await getRepository(RecordEntity)
      .createQueryBuilder('records')
      .leftJoinAndSelect('records.reviews', 'reviews')
      .leftJoinAndSelect('records.author', 'author')
      .where('records.name like :name', { name: `%${query}%` })
      .getMany();
    const dataByAuthor = await getRepository(RecordEntity)
      .createQueryBuilder('records')
      .leftJoinAndSelect('records.reviews', 'reviews')
      .leftJoinAndSelect('records.author', 'author')
      .where('author.name like :name', { name: `%${query}%` })
      .getMany();
    const result: RecordEntity[] = dataByName.concat(dataByAuthor);
    for (let i = 0; i < result.length; i++) {
      if (records.indexOf(result[i]) === -1) {
        records.push(result[i]);
      }
    }
    return records;
  }
}

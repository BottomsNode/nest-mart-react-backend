import {
  Repository,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseRepository<T> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(entity: DeepPartial<T>): Promise<T> {
    const newEntity = this.repository.create(entity);
    return await this.repository.save(newEntity);
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return await this.repository.findOne(options);
  }

  async find(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  async update(id: number, entity: QueryDeepPartialEntity<T>): Promise<T> {
    const result: UpdateResult = await this.repository.update(id, entity);
    if (result.affected === 0) {
      throw new Error(`Entity with id ${id} not found`);
    }
    return await this.findOne({ where: { id } } as unknown);
  }

  async delete(id: number, softDelete: boolean = true): Promise<void> {
    if (softDelete) {
      await this.repository.softDelete(id);
    } else {
      await this.repository.delete(id);
    }
  }

  abstract queryBuilder(query: string, params?: any): Promise<T[]>;
}

import { Repository, DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
export declare abstract class BaseRepository<T> {
    protected readonly repository: Repository<T>;
    constructor(repository: Repository<T>);
    create(entity: DeepPartial<T>): Promise<T>;
    findOne(options: FindOneOptions<T>): Promise<T | null>;
    find(options?: FindManyOptions<T>): Promise<T[]>;
    update(id: number, entity: QueryDeepPartialEntity<T>): Promise<T>;
    delete(id: number, softDelete?: boolean): Promise<void>;
    abstract queryBuilder(query: string, params?: any): Promise<T[]>;
}

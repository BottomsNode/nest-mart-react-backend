import { BaseEntity } from 'typeorm';
export declare abstract class MyBaseEntity extends BaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

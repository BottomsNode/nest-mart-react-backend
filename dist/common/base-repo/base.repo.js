"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(entity) {
        const newEntity = this.repository.create(entity);
        return await this.repository.save(newEntity);
    }
    async findOne(options) {
        return await this.repository.findOne(options);
    }
    async find(options) {
        return await this.repository.find(options);
    }
    async update(id, entity) {
        const result = await this.repository.update(id, entity);
        if (result.affected === 0) {
            throw new Error(`Entity with id ${id} not found`);
        }
        return await this.findOne({ where: { id } });
    }
    async delete(id, softDelete = true) {
        if (softDelete) {
            await this.repository.softDelete(id);
        }
        else {
            await this.repository.delete(id);
        }
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repo.js.map
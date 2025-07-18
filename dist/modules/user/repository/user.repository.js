"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const common_2 = require("../../../common");
const user_entity_1 = require("../entities/user.entity");
const response_customer_dto_1 = require("../dto/response-customer.dto");
const nestjs_1 = require("@automapper/nestjs");
let UserRepository = class UserRepository extends common_2.BaseRepository {
    userRepo;
    mapper;
    constructor(userRepo, mapper) {
        super(userRepo);
        this.userRepo = userRepo;
        this.mapper = mapper;
    }
    async findByEmail(email) {
        return await this.userRepo.findOne({
            where: { email },
            relations: ['address'],
        });
    }
    async createUser(dto, role) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const entity = this.userRepo.create(dto);
        entity.password = hashedPassword;
        entity.role = role;
        const savedEntity = await this.create(entity);
        return this.mapper.map(savedEntity, user_entity_1.CustomerEntity, response_customer_dto_1.CustomerResponseDTO);
    }
    async queryBuilder(query, params = []) {
        return await this.userRepo.query(query, params);
    }
    async dataAndPagination(isActive = true, roleName, page = common_2.Pagination_Length.START, limit = common_2.Pagination_Length.VERY_SMALL) {
        const queryBuilder = this.userRepo
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.address', 'address')
            .leftJoinAndSelect('user.role', 'role')
            .where('user.isActive = :isActive', { isActive })
            .andWhere('role.name = :roleName', { roleName })
            .take(limit)
            .skip((page - 1) * limit);
        const [users, count] = await queryBuilder.getManyAndCount();
        const mappedUsers = this.mapper.mapArray(users, user_entity_1.CustomerEntity, response_customer_dto_1.CustomerResponseDTO);
        const totalPages = Math.ceil(count / limit);
        return { users: mappedUsers, count, totalPages };
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.CustomerEntity)),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], UserRepository);
//# sourceMappingURL=user.repository.js.map
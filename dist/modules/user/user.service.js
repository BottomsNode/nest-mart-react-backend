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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const nestjs_1 = require("@automapper/nestjs");
const user_entity_1 = require("./entities/user.entity");
const response_customer_dto_1 = require("./dto/response-customer.dto");
const main_customer__dto_1 = require("./dto/main-customer..dto");
const common_2 = require("../../common");
const address_service_1 = require("../address/address.service");
const user_repository_1 = require("./repository/user.repository");
const conflict_exception_1 = require("../../common/exception/conflict.exception");
const roles_repository_1 = require("../auth/repository/roles.repository");
let UserService = class UserService {
    customerRepo;
    roleRepo;
    addressService;
    mapper;
    constructor(customerRepo, roleRepo, addressService, mapper) {
        this.customerRepo = customerRepo;
        this.roleRepo = roleRepo;
        this.addressService = addressService;
        this.mapper = mapper;
    }
    async create(dto) {
        const existingCustomer = await this.customerRepo.findOne({
            where: { email: dto.email },
        });
        if (existingCustomer)
            throw new conflict_exception_1.CustomConflictException('Customer with this email already exists');
        const role = await this.roleRepo.findOne({ where: { id: 3 } });
        return await this.customerRepo.createUser(dto, role);
    }
    async getAllUsers() {
        const users = await this.customerRepo.find({ relations: ['address'] });
        if (!users || users.length === 0)
            throw new common_2.CustomNotFoundException('No users found');
        const mainDtoList = this.mapper.mapArray(users, user_entity_1.CustomerEntity, main_customer__dto_1.CustomerMainDTO);
        return this.mapper.mapArray(mainDtoList, main_customer__dto_1.CustomerMainDTO, response_customer_dto_1.CustomerResponseDTO);
    }
    async getUser(params) {
        const user = await this.customerRepo.findOne({
            where: { id: params.Id },
            relations: ['address'],
        });
        if (!user)
            throw new common_2.CustomNotFoundException('User not found');
        const mainDto = this.mapper.map(user, user_entity_1.CustomerEntity, main_customer__dto_1.CustomerMainDTO);
        return this.mapper.map(mainDto, main_customer__dto_1.CustomerMainDTO, response_customer_dto_1.CustomerResponseDTO);
    }
    async updateUser(params, dto) {
        const existing = await this.customerRepo.findOne({
            where: { id: params.Id },
            relations: ['address'],
        });
        if (!existing)
            throw new common_2.CustomNotFoundException('User  not found');
        const updatedUser = await this.customerRepo.update(params.Id, dto);
        const mainDto = this.mapper.map(updatedUser, user_entity_1.CustomerEntity, main_customer__dto_1.CustomerMainDTO);
        return this.mapper.map(mainDto, main_customer__dto_1.CustomerMainDTO, response_customer_dto_1.CustomerResponseDTO);
    }
    async deleteUser(params) {
        const user = await this.customerRepo.findOne({ where: { id: params.Id } });
        if (!user)
            throw new common_2.CustomNotFoundException('User  not found');
        await this.customerRepo.delete(params.Id);
    }
    async setActiveStatus(params, isActive) {
        const user = await this.customerRepo.findOne({ where: { id: params.Id } });
        if (!user)
            throw new common_2.CustomNotFoundException('User  not found');
        user.isActive = isActive;
        const saved = await this.customerRepo.update(params.Id, user);
        return this.mapper.map(saved, user_entity_1.CustomerEntity, response_customer_dto_1.CustomerResponseDTO);
    }
    async getActiveCustomers(pagination) {
        const role = await this.roleRepo.findOne({ where: { id: 3 } });
        return this.getUsersByStatusAndRole(true, role, pagination);
    }
    async getDeactiveCustomers(pagination) {
        const role = await this.roleRepo.findOne({ where: { id: 3 } });
        return this.getUsersByStatusAndRole(false, role, pagination);
    }
    async searchByName(term) {
        const found = await this.customerRepo.queryBuilder('SELECT * FROM customer_entity WHERE name ILIKE $1 or email ILIKE $1', [`%${term}%`]);
        const mainList = this.mapper.mapArray(found, user_entity_1.CustomerEntity, main_customer__dto_1.CustomerMainDTO);
        return this.mapper.mapArray(mainList, main_customer__dto_1.CustomerMainDTO, response_customer_dto_1.CustomerResponseDTO);
    }
    async updatePassword(params, password) {
        const user = await this.customerRepo.findOne({ where: { id: params.Id } });
        if (!user)
            throw new common_2.CustomNotFoundException('User  not found');
        user.password = await bcrypt.hash(password, 10);
        const saved = await this.customerRepo.update(params.Id, user);
        return this.mapper.map(saved, user_entity_1.CustomerEntity, response_customer_dto_1.CustomerResponseDTO);
    }
    async updateEmail(params, email) {
        const user = await this.customerRepo.findOne({ where: { id: params.Id } });
        if (!user)
            throw new common_2.CustomNotFoundException('User  not found');
        user.email = email;
        const saved = await this.customerRepo.update(params.Id, user);
        return this.mapper.map(saved, user_entity_1.CustomerEntity, response_customer_dto_1.CustomerResponseDTO);
    }
    async getUsersByStatusAndRole(isActive, role, pagination) {
        const data = await this.customerRepo.dataAndPagination(isActive, role, pagination.page, pagination.limit);
        return {
            users: data.users,
            totalRecords: data.count,
            totalPages: data.totalPages,
        };
    }
    async findByEmail(email) {
        return await this.customerRepo.findOne({
            where: { email },
            relations: ['address'],
        });
    }
    async updateUserAddress(params, dto) {
        const user = await this.customerRepo.findOne({
            where: { id: params.Id },
            relations: ['address'],
        });
        if (!user)
            throw new common_2.CustomNotFoundException('User  not found');
        if (!user.address)
            throw new common_2.CustomNotFoundException('User has no address associated');
        await this.addressService.updateAddress(user.address.id, dto);
        const refreshedUser = await this.customerRepo.findOne({
            where: { id: user.id },
            relations: ['address'],
        });
        const main = this.mapper.map(refreshedUser, user_entity_1.CustomerEntity, main_customer__dto_1.CustomerMainDTO);
        return this.mapper.map(main, main_customer__dto_1.CustomerMainDTO, response_customer_dto_1.CustomerResponseDTO);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('UserRepository')),
    __param(1, (0, common_1.Inject)('RolesRepository')),
    __param(3, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        roles_repository_1.RolesRepository,
        address_service_1.AddressService, Object])
], UserService);
//# sourceMappingURL=user.service.js.map
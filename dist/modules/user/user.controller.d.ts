import { UserService } from './user.service';
import { IdParamDto, PaginationRequestDto } from 'src/common';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';
import { CustomerResponseDTO } from './dto/response-customer.dto';
import { PatchEmailDTO } from './dto/patch/patch-email.dto';
import { PatchPasswordDTO } from './dto/patch/patch-password.dto';
import { PatchAddressDTO } from '../address/dto/patch/patch-address.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createCustomer(body: CreateCustomerDTO): Promise<CustomerResponseDTO>;
    getAllCustomer(): Promise<CustomerResponseDTO[]>;
    getCustomer(params: IdParamDto): Promise<CustomerResponseDTO>;
    updateCustomer(params: IdParamDto, body: UpdateCustomerDTO): Promise<CustomerResponseDTO>;
    deleteCustomer(params: IdParamDto): Promise<void>;
    searchProducts(term: string): Promise<CustomerResponseDTO[]>;
    activateUser(params: IdParamDto): Promise<CustomerResponseDTO>;
    deactivateUser(params: IdParamDto): Promise<CustomerResponseDTO>;
    getActiveUsers(pagination: PaginationRequestDto): Promise<{
        users: CustomerResponseDTO[];
        totalRecords: number;
        totalPages: number;
    }>;
    getDeactiveUsers(pagination: PaginationRequestDto): Promise<{
        users: CustomerResponseDTO[];
        totalRecords: number;
        totalPages: number;
    }>;
    updateUserPassword(body: PatchPasswordDTO): Promise<CustomerResponseDTO>;
    updateUserEmail(params: IdParamDto, body: PatchEmailDTO): Promise<CustomerResponseDTO>;
    updateAddress(params: IdParamDto, dto: PatchAddressDTO): Promise<CustomerResponseDTO>;
}

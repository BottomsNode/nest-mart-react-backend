import {
  Controller,
  Get,
  Param,
  Put,
  Delete,
  Body,
  Post,
  UseGuards,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { IdParamDto, PaginationRequestDto, Permissions } from 'src/common';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';
import { CustomerResponseDTO } from './dto/response-customer.dto';
import { PatchEmailDTO } from './dto/patch/patch-email.dto';
import { PatchPasswordDTO } from './dto/patch/patch-password.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PatchAddressDTO } from '../address/dto/patch/patch-address.dto';
import { PermissionGuard } from '../auth/guards/permissions.guard';

@ApiTags('Users → (Customers/Admin)')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions('MANAGE_USERS')
  @ApiOperation({ summary: 'Create a new user (Only Admin Can)' })
  async createCustomer(
    @Body() body: CreateCustomerDTO,
  ): Promise<CustomerResponseDTO> {
    return this.userService.create(body);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions('VIEW_USERS')
  async getAllCustomer(): Promise<CustomerResponseDTO[]> {
    return this.userService.getAllUsers();
  }

  @Get(':Id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions('VIEW_USERS')
  @ApiOperation({ summary: 'Get user by ID (Only Admin/Manager Can)' })
  async getCustomer(@Param() params: IdParamDto): Promise<CustomerResponseDTO> {
    return this.userService.getUser(params);
  }

  @Put(':Id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions('UPDATE_SELF')
  @ApiOperation({
    summary: 'Update user data by ID (Only Admin/Manager/User Can)',
  })
  async updateCustomer(
    @Param() params: IdParamDto,
    @Body() body: UpdateCustomerDTO,
  ): Promise<CustomerResponseDTO> {
    return this.userService.updateUser(params, body);
  }

  @Delete(':Id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions('MANAGE_USERS')
  @ApiOperation({ summary: 'Delete user by ID (Only Admin Can)' })
  async deleteCustomer(@Param() params: IdParamDto): Promise<void> {
    return this.userService.deleteUser(params);
  }

  @Get('search/:term')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions('VIEW_USERS')
  @ApiOperation({
    summary: 'Search user by name (partial match) (Only Admin/Manager Can)',
  })
  searchProducts(@Param('term') term: string): Promise<CustomerResponseDTO[]> {
    return this.userService.searchByName(term);
  }

  @ApiBearerAuth()
  @Put(':Id/activate')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions('MANAGE_USERS')
  @ApiOperation({ summary: 'Activate user account (Only Admin Can)' })
  async activateUser(@Param() params: IdParamDto) {
    return this.userService.setActiveStatus(params, true);
  }

  @ApiBearerAuth()
  @Put(':Id/deactivate')
  @Permissions('MANAGE_USERS')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions()
  @ApiOperation({ summary: 'Deactivate user account (Only Admin Can)' })
  async deactivateUser(@Param() params: IdParamDto) {
    return this.userService.setActiveStatus(params, false);
  }

  @ApiBearerAuth()
  @Get('/list/active/users')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions('MANAGE_USERS')
  @ApiOperation({ summary: 'Get all active customer list (Only Admin Can)' })
  getActiveUsers(@Query() pagination: PaginationRequestDto): Promise<{
    users: CustomerResponseDTO[];
    totalRecords: number;
    totalPages: number;
  }> {
    return this.userService.getActiveCustomers(pagination);
  }

  @ApiBearerAuth()
  @Get('/list/deactivate/users')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions('MANAGE_USERS')
  @ApiOperation({ summary: 'Get all Deactive customer list (Only Admin Can)' })
  getDeactiveUsers(@Query() pagination: PaginationRequestDto): Promise<{
    users: CustomerResponseDTO[];
    totalRecords: number;
    totalPages: number;
  }> {
    return this.userService.getDeactiveCustomers(pagination);
  }

  @Put('password/reset')
  @ApiOperation({ summary: 'Update user password (by email)' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updateUserPassword(@Body() body: PatchPasswordDTO) {
    return this.userService.updatePassword(body.email, body.password);
  }

  @ApiBearerAuth()
  @Put(':Id/email')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions('UPDATE_SELF')
  @ApiOperation({ summary: 'Update user email (Only Admin/Manager/User Can)' })
  async updateUserEmail(
    @Param() params: IdParamDto,
    @Body() body: PatchEmailDTO,
  ) {
    return this.userService.updateEmail(params, body.email);
  }

  @ApiBearerAuth()
  @Put(':Id/address')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions('UPDATE_SELF')
  @ApiOperation({
    summary: 'Update user address (Only Admin/Manager/User Can)',
  })
  async updateAddress(
    @Param() params: IdParamDto,
    @Body() dto: PatchAddressDTO,
  ): Promise<CustomerResponseDTO> {
    return this.userService.updateUserAddress(params, dto);
  }
}

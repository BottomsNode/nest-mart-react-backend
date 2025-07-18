import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { SaleService } from '../sale.service';
import { IdParamDto, Permissions } from 'src/common';
import { SaleResponseDTO } from '../dto/sales/response-sales.dto';
import { CreateSaleDTO } from '../dto/sales/create-sales.dto';
import { UpdateSaleDTO } from '../dto/sales/update-sales.dto';
import { PermissionGuard } from 'src/modules/auth/guards/permissions.guard';

@ApiTags('Sales')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) { }

  @Post()
  @Permissions('CREATE_SALES')
  async create(@Body() dto: CreateSaleDTO) {
    return this.saleService.create(dto);
  }

  @Get()
  @Permissions('VIEW_SALES')
  async getAll() {
    return this.saleService.getAllSales();
  }

  // @Get(':Id')
  // @Permissions('VIEW_OWN_SALES')
  // @ApiResponse({ status: 404, description: 'Sale not found' })
  // async getOne(@Param() params: IdParamDto): Promise<SaleResponseDTO> {
  //   return this.saleService.getSaleById(params);
  // }
  @Get('by-customer-email/:email')
  @Permissions('VIEW_OWN_SALES')
  @ApiResponse({ status: 404, description: 'No sales found for this customer' })
  async getSalesByCustomerEmail(@Param('email') email: string): Promise<SaleResponseDTO[]> {
    return this.saleService.getSalesByCustomerEmail(email);
  }

  @Put(':Id')
  @Permissions('VIEW_SALES')
  @ApiResponse({ status: 404, description: 'Sale not found' })
  async update(
    @Param() params: IdParamDto,
    @Body() dto: UpdateSaleDTO,
  ): Promise<SaleResponseDTO> {
    return this.saleService.updateSale(params, dto);
  }

  @Delete(':Id')
  @Permissions('DELETE_PRODUCTS')
  async delete(@Param() params: IdParamDto): Promise<void> {
    return this.saleService.deleteSale(params);
  }
}

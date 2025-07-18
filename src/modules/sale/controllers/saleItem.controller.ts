import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdParamDto, Permissions } from 'src/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { SaleItemResponseDTO } from '../dto/items/response-salesItem.dto';
import { UpdateSaleItemDTO } from '../dto/items/update-salesItem.dto';
import { SaleItemService } from '../saleItem.service';
import { PermissionGuard } from 'src/modules/auth/guards/permissions.guard';

@ApiTags('Sale Items')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@Controller('sale-item')
export class SaleItemController {
  constructor(private readonly saleItemService: SaleItemService) {}

  @Get()
  @Permissions('VIEW_SALES')
  async getAll(): Promise<SaleItemResponseDTO[]> {
    return this.saleItemService.getAllSaleItems();
  }

  @Get(':Id')
  @Permissions('VIEW_SALES')
  async getOne(@Param() params: IdParamDto): Promise<SaleItemResponseDTO> {
    return this.saleItemService.getSaleItemById(params);
  }

  @Put(':Id')
  @Permissions('VIEW_SALES')
  @ApiOperation({ summary: 'Update a sale item (ADMIN only)' })
  async update(
    @Param() params: IdParamDto,
    @Body() dto: UpdateSaleItemDTO,
  ): Promise<SaleItemResponseDTO> {
    return this.saleItemService.updateSaleItem(params, dto);
  }

  @Delete(':Id')
  @Permissions('DELETE_PRODUCTS')
  @ApiOperation({ summary: 'Delete a sale item (ADMIN only)' })
  async delete(@Param() params: IdParamDto): Promise<void> {
    return this.saleItemService.deleteSaleItem(params);
  }
}

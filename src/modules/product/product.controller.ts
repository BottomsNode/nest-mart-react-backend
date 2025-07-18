import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import {
  IdParamDto,
  PaginationRequestDto,
  Permissions,
  PRODUCT_STATUS,
  StockDTO,
} from 'src/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProductResponseDTO } from './dto/response-product.dto';
import { PermissionGuard } from '../auth/guards/permissions.guard';

@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Permissions('MANAGE_PRODUCTS')
  @ApiOperation({ summary: 'Create a new product (ADMIN only)' })
  create(@Body() dto: CreateProductDTO) {
    return this.productService.create(dto);
  }

  @Get()
  @Permissions('VIEW_PRODUCTS')
  getAll(@Query() pagnation: PaginationRequestDto) {
    return this.productService.getAll(pagnation);
  }

  @Get(':Id')
  @Permissions('VIEW_PRODUCTS')
  getOne(@Param() params: IdParamDto): Promise<ProductResponseDTO> {
    return this.productService.getOne(params);
  }

  @Get('/list/active')
  @Permissions('MANAGE_PRODUCTS')
  getActiveProducts(@Query() pagination: PaginationRequestDto): Promise<{
    products: ProductResponseDTO[];
    totalRecords: number;
    totalPages: number;
  }> {
    return this.productService.getActiveProducts(pagination);
  }

  @Get('/list/deactivate')
  @Permissions('MANAGE_PRODUCTS')
  getDeactiveProducts(@Query() pagination: PaginationRequestDto): Promise<{
    products: ProductResponseDTO[];
    totalRecords: number;
    totalPages: number;
  }> {
    return this.productService.getDeactiveProducts(pagination);
  }

  @Get('search/:term')
  @Permissions('VIEW_PRODUCTS')
  searchProducts(@Param('term') term: string): Promise<ProductResponseDTO[]> {
    return this.productService.searchByName(term);
  }

  @Put(':Id')
  @Permissions('MANAGE_PRODUCTS')
  update(
    @Param() params: IdParamDto,
    @Body() dto: UpdateProductDTO,
  ): Promise<ProductResponseDTO> {
    return this.productService.update(params, dto);
  }

  @Put(':Id/:stock')
  @Permissions('UPDATE_STOCKS')
  updateStock(
    @Param() params: IdParamDto,
    @Body() stock: StockDTO,
  ): Promise<ProductResponseDTO> {
    return this.productService.updateStock(params,stock);
  }

  @Put(':Id/activate/my/prod')
  @Permissions('MANAGE_PRODUCTS')
  activateProduct(@Param() params: IdParamDto): Promise<ProductResponseDTO> {
    console.log(params)
    return this.productService.setStatus(params, PRODUCT_STATUS.ACTIVE);
  }

  @Put(':Id/deactivate/prod')
  @Permissions('MANAGE_PRODUCTS')
  deactivateProduct(@Param() params: IdParamDto): Promise<ProductResponseDTO> {
    console.log(params)
    return this.productService.setStatus(params, PRODUCT_STATUS.INACTIVE);
  }

  @Delete(':Id')
  @Permissions('DELETE_PRODUCTS')
  delete(@Param() params: IdParamDto): Promise<void> {
    return this.productService.delete(params);
  }
}

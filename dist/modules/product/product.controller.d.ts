import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { IdParamDto, PaginationRequestDto, StockDTO } from 'src/common';
import { ProductResponseDTO } from './dto/response-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(dto: CreateProductDTO): Promise<ProductResponseDTO>;
    getAll(pagnation: PaginationRequestDto): Promise<{
        products: import("./dto/main-product.dto").ProductMainDTO[];
        totalRecords: number;
        totalPages: number;
    }>;
    getOne(params: IdParamDto): Promise<ProductResponseDTO>;
    getActiveProducts(pagination: PaginationRequestDto): Promise<{
        products: ProductResponseDTO[];
        totalRecords: number;
        totalPages: number;
    }>;
    getDeactiveProducts(pagination: PaginationRequestDto): Promise<{
        products: ProductResponseDTO[];
        totalRecords: number;
        totalPages: number;
    }>;
    searchProducts(term: string): Promise<ProductResponseDTO[]>;
    update(params: IdParamDto, dto: UpdateProductDTO): Promise<ProductResponseDTO>;
    updateStock(params: IdParamDto, stock: StockDTO): Promise<ProductResponseDTO>;
    activateProduct(params: IdParamDto): Promise<ProductResponseDTO>;
    deactivateProduct(params: IdParamDto): Promise<ProductResponseDTO>;
    delete(params: IdParamDto): Promise<void>;
}

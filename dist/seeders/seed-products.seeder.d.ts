import { DataSource } from 'typeorm';
export declare function seedProducts(dataSource: DataSource): Promise<void>;
export declare function seedProductsWithCategories(dataSource: DataSource): Promise<void>;
export declare function clearProductsWithCascade(dataSource: DataSource): Promise<void>;
export declare function clearProductsSafely(dataSource: DataSource): Promise<void>;
export declare function seedProductsProduction(dataSource: DataSource): Promise<void>;

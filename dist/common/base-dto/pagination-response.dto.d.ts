export declare class PaginationResponseDto<T> {
    items: T[];
    total: number;
    currentPage: number;
    totalPages: number;
    limit: number;
    constructor(items: T[], total: number, page: number, limit: number);
}

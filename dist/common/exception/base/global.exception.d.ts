import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class GlobalExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}

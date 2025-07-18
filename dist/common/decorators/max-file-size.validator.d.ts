import { ValidationOptions } from 'class-validator';
export declare function MaxFileSize(maxSize: number, validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;

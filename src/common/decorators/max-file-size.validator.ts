import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

interface FileWithBuffer {
  buffer: Buffer;
  size: number;
}

export function MaxFileSize(
  maxSize: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'maxFileSize',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [maxSize],
      options: validationOptions,
      validator: {
        validate(value: unknown): boolean {
          if (value && (value as FileWithBuffer).buffer) {
            const file = value as FileWithBuffer;
            return file.size <= maxSize;
          }
          return false;
        },
        defaultMessage(args: ValidationArguments): string {
          return `File size should not exceed ${args.constraints[0]} bytes`;
        },
      },
    });
  };
}

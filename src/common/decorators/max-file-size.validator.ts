import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function MaxFileSize(maxSize: number, validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'maxFileSize',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [maxSize],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (value && value.buffer) {
                        return value.size <= maxSize;
                    }
                    return false;
                },
                defaultMessage(args: ValidationArguments) {
                    return `File size should not exceed ${args.constraints[0]} bytes`;
                },
            },
        });
    };
}

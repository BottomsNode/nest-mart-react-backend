"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxFileSize = MaxFileSize;
const class_validator_1 = require("class-validator");
function MaxFileSize(maxSize, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'maxFileSize',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [maxSize],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    if (value && value.buffer) {
                        return value.size <= maxSize;
                    }
                    return false;
                },
                defaultMessage(args) {
                    return `File size should not exceed ${args.constraints[0]} bytes`;
                },
            },
        });
    };
}
//# sourceMappingURL=max-file-size.validator.js.map
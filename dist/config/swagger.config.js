"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
const secrets_keys_1 = require("../common/secrets/secrets.keys");
exports.swaggerConfig = new swagger_1.DocumentBuilder()
    .setTitle('NestMart API Documentation')
    .setDescription('Swagger For API Documentation')
    .setVersion('1.0')
    .addServer(`http://localhost:${secrets_keys_1.PORT}/`, `${secrets_keys_1.DB_NAME} Local environment`)
    .addTag(`List of ${secrets_keys_1.DB_NAME} API's`)
    .addBearerAuth()
    .build();
//# sourceMappingURL=swagger.config.js.map
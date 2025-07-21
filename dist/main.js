"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const swagger_config_1 = require("./config/swagger.config");
const common_1 = require("./common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: "*",
        methods: 'GET,POST,PUT,DELETE,OPTIONS',
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'x-user-id',
            'Accept',
            'Origin',
            'X-Requested-With',
            'Access-Control-Allow-Origin'
        ],
        credentials: true,
    });
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, swagger_config_1.swaggerConfig);
    swagger_1.SwaggerModule.setup(`${common_1.SWAGGER_DOCS}`, app, documentFactory);
    app.useGlobalFilters(new common_1.GlobalExceptionsFilter());
    await app.listen(common_1.PORT);
}
bootstrap()
    .then(() => {
    console.log(`Appication Started on ${common_1.PORT}`);
})
    .catch((error) => {
    console.error('Error starting app:', error);
});
//# sourceMappingURL=main.js.map
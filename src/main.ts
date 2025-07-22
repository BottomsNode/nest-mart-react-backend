import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';
import { GlobalExceptionsFilter, PORT, SWAGGER_DOCS } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins
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

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${SWAGGER_DOCS}`, app, documentFactory);
  app.useGlobalFilters(new GlobalExceptionsFilter());
  await app.listen(PORT);
}
bootstrap()
.then(() => {
    runForever()
    console.log(`Appication Started on ${PORT}`);
  })
  .catch((error) => {
    console.error('Error starting app:', error);
  });

function runForever(): void {
  let count = 1;
  setInterval(() => {
    console.log(`Application is running...`);
    count++;
  }, 10000);
}

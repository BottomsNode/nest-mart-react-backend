import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';
import { GlobalExceptionsFilter, PORT, SWAGGER_DOCS } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'x-user-id',
      'Accept',
      'Origin',
      'X-Requested-With',
      'Access-Control-Allow-Origin',
    ],
    credentials: true,
  });

  // Setup Swagger
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${SWAGGER_DOCS}`, app, documentFactory);

  app.useGlobalFilters(new GlobalExceptionsFilter());

  await app.listen(PORT);

  console.log(`🚀 Application Started on port ${PORT}`);

  // Start background tasks
  runHeartbeat();
  monitorMemory();
}

bootstrap().catch((error) => {
  console.error('❌ Error starting app:', error);
});

function runHeartbeat(): void {
  let count = 1;
  setInterval(() => {
    console.log(`💓 Application heartbeat... (${count++})`);
  }, 10000);
}

function monitorMemory(): void {
  setInterval(() => {
    const used = process.memoryUsage();
    console.log(
      `📊 Memory Usage - Heap Used: ${(used.heapUsed / 1024 / 1024).toFixed(2)} MB`,
    );
  }, 60000);
}

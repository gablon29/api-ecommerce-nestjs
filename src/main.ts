import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // habilitamos CORS
  app.enableCors();
  app.use(LoggerMiddleware);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { registerSwagger } from './swagger';
import { ValidationPipe } from '@nestjs/common';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 分钟
    max: 100, // 最大 100个 ip
  }));
  registerSwagger(app)();
  await app.listen(3000);
}
bootstrap();

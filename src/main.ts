import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { registerSwagger } from './swagger';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: false,
  });

  app.use(cookieParser());

  app.use(
    session({
      secret: 'nest',
      name: 'nest',
      cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 设置 cookie 7天后过期
      resave: true,
      rolling: true,
      saveUninitialized: false,
    }),
  );

  app.useGlobalPipes(new ValidationPipe());

  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 分钟
    max: 100, // 最大 100个 ip
  }));

  registerSwagger(app)();

  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { registerSwagger } from './common/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as connectRedis from 'connect-redis';
import * as expressSession from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

(async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    ApplicationModule,
    {
      cors: true,
    },
  );

  const RedisStore = connectRedis(expressSession);

  // 全局参数验证
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
      forbidUnknownValues: true,
    }),
  );

  // // 全局异常处理
  // app.useGlobalFilters(new HttpExceptionFilter());

  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Session
  app.use(
    expressSession({
      secret: 'nest',
      name: 'nest',
      store: new RedisStore({
        // host: 'localhost',
        // docker-compose 的 环境变量
        host: 'rd',
        port: 6379,
        ttl: 60,
        logErrors: true,
      }),
      cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 设置 cookie 7天后过期
      resave: false,
      rolling: true,
      saveUninitialized: false,
    }),
  );

  // Cookie
  app.use(cookieParser());

  // Header 头 安全
  app.use(helmet());

  // 接口访问限制
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 分钟
      max: 100, // 最大 100个 ip
    }),
  );

  // Swagger
  registerSwagger(app)();

  await app.listen(3000);
})();

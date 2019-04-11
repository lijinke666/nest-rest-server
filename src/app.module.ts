import { CacheModule, Module , NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ConfigService } from './config/config.service';
import { ArticleModule } from './article/article.module';

const CoreModules = [
  UserModule,
  ArticleModule,
  AuthModule,
]

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService)=> ({
        store: redisStore,
        ttl: configService.get('REDIS_TTL') as unknown as number,
        // docker link => redis
        host: 'rd' || configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
      }),
      inject: [ConfigService]
    }),
    ConfigModule,
    TypeOrmModule.forRoot(),
    ...CoreModules,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})

export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes("*")
  }
}

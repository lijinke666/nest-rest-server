import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import jwtConfig from './jwt.config';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: jwtConfig.strategy }),
    JwtModule.register({
      secretOrPrivateKey: jwtConfig.secretKey,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    UserModule,
  ],
  // controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}

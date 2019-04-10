import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload, JwtResponse } from './interfaces/jwt.interface';
import { UserService } from 'src/user/user.service';
import { User } from '..//user/user.entity';
import jwtConfig from './jwt.config';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signIn(user: any): Promise<JwtResponse> {
    const token = this.jwtService.sign(user);
    return {
      expiresIn: jwtConfig.expiresIn,
      token: `Bearer ${token}`,
    };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    return await this.userService.findOnyById(payload.id);
  }
}

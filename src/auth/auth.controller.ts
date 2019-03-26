import { Controller, Get, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserCatDto } from '../user/dto/login-user.dto';
import { UserService } from 'src/user/user.service';

@ApiUseTags('权限管理')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // @Get('login')
  // @UseGuards(AuthGuard())
  // @ApiOperation({title: '登录'})
  // async login(@Body() loginUserDto: LoginUserCatDto): Promise<any> {
  //   const user = await this.userService.findOne(loginUserDto);
  //   if (user) {
  //     return await this.authService.signIn(user);
  //   }
  // }
}

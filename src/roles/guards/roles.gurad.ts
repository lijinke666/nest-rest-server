import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../../user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // controller 级别的权限 getClass router 级别的权限 getHandler
    const roles = this.reflector.get<string[]>('roles', context.getClass());
    if (!roles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const userId = req.session.userId;
    const user = await this.userService.findOnyById(userId);
    const hasRole = () => roles.includes(user.role);
    if (user && user.role && hasRole()) {
      return true;
    } else {
      throw new ForbiddenException('没有权限!');
    }
  }
}

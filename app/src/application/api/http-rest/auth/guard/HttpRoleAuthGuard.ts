import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Code } from '@/core/common/code/Code';
import { UserActiveStatus, UserRoles } from '@/core/common/enums/UserEnums';
import { Exception } from '@/core/common/exception/Exception';
import { HttpRequestWithUser } from '../type/HttpAuthTypes';

@Injectable()
export class HttpRoleAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: UserRoles[] =
      this.reflector.get<UserRoles[]>('roles', context.getHandler()) || [];

    const request: HttpRequestWithUser = context.switchToHttp().getRequest();

    const { user } = request;

    const { isActive, role } = user;

    const canActivate: boolean =
      roles.length > 0
        ? roles.includes(role) && isActive === UserActiveStatus.ACTIVE
        : true;

    if (!canActivate) {
      throw Exception.new({
        code: Code.ACCESS_DANIED_ERROR,
        message: 'Acesso não autorizado',
      });
    }

    return canActivate;
  }
}

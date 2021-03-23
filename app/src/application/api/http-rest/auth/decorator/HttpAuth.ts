import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRoles } from '@/core/common/enums/UserEnums';
import { HttpJwtAuthGuard } from '../guard/HttpJwtAuthGuard';
import { HttpRoleAuthGuard } from '../guard/HttpRoleAuthGuard';

export const HttpAuth = (...roles: UserRoles[]): ((...args: any) => void) => {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(HttpJwtAuthGuard, HttpRoleAuthGuard),
  );
};

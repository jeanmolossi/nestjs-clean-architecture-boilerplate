import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { UserRoles } from '@/core/common/enums/UserEnums';

export const HttpRoles = (...roles: UserRoles[]): CustomDecorator<string> =>
  SetMetadata('roles', roles);

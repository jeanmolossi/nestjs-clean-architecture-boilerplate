import { ApiPropertyOptional } from '@nestjs/swagger';
import { Optional, UserActiveStatus, UserRoles } from '@/core/common';
import { IUserFilters, User } from '@/core/domain/user';
import { HttpRestApiBaseFilters } from '../_defaults/HttpRestApiBaseFilters';

export class HttpRestApiUserFilters extends HttpRestApiBaseFilters<User>
  implements IUserFilters {
  @ApiPropertyOptional({ type: 'string', example: 'John' })
  first_name?: Optional<string>;

  @ApiPropertyOptional({ type: 'string', example: 'Doe' })
  last_name?: Optional<string>;

  @ApiPropertyOptional({ type: 'string', example: '12345678912' })
  cpf?: Optional<string>;

  @ApiPropertyOptional({ type: 'string', example: 'john@doe.com' })
  email?: Optional<string>;

  @ApiPropertyOptional({
    enum: UserActiveStatus,
    example: `${UserActiveStatus.INACTIVE}`,
  })
  isActive?: Optional<UserActiveStatus>;

  @ApiPropertyOptional({ enum: UserRoles, example: `${UserRoles.ADMIN}` })
  role?: Optional<UserRoles>;

  withRelation?: Optional<string[]>;
}

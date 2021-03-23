import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserActiveStatus, UserRoles } from '@/core/common/enums/UserEnums';
import { Optional } from '@/core/common/type/CommonTypes';
import { IUpdateUserPort } from '@/core/domain/user';
import { v4 } from 'uuid';

export class HttpRestApiModelUpdateUserBody implements IUpdateUserPort {
  @ApiPropertyOptional({ type: 'string', example: v4() })
  id: Optional<string>;

  @ApiPropertyOptional({ type: 'string', example: 'John' })
  first_name: Optional<string>;

  @ApiPropertyOptional({ type: 'string', example: 'Doe' })
  last_name: Optional<string>;

  @ApiPropertyOptional({ type: 'string', example: '12312312312' })
  cpf: Optional<string>;

  @ApiPropertyOptional({ type: 'string', example: 'seu@email.com' })
  email: Optional<string>;

  @ApiPropertyOptional({
    enum: UserRoles,
    example: UserRoles.ADMIN,
  })
  role: Optional<UserRoles>;

  @ApiPropertyOptional({
    enum: UserActiveStatus,
    enumName: 'UserActiveStatus',
  })
  isActive: Optional<UserActiveStatus>;

  updated_at: Optional<Date>;
}

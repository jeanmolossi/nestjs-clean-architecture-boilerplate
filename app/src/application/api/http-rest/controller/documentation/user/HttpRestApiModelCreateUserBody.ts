import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserActiveStatus, UserRoles } from '@/core/common/enums/UserEnums';
import { Optional } from '@/core/common/type/CommonTypes';
import { ICreateUserPort } from '@/core/domain/user';

export class HttpRestApiModelCreateUserBody implements ICreateUserPort {
  id: Optional<string>;

  @ApiProperty({ type: 'string', example: 'John' })
  first_name: string;

  @ApiProperty({ type: 'string', example: 'Doe' })
  last_name: string;

  @ApiProperty({ type: 'string', example: '12312312312' })
  cpf: string;

  @ApiProperty({ type: 'string', example: 'seu@email.com' })
  email: string;

  @ApiProperty({ type: 'string', example: 'senha' })
  password: string;

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

  created_at: Optional<Date>;

  updated_at: Optional<Date>;
}

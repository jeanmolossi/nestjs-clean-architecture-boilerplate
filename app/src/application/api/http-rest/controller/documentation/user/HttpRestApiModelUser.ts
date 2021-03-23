import { ApiProperty } from '@nestjs/swagger';
import { UserActiveStatus, UserRoles } from '@/core/common/enums/UserEnums';

export class HttpRestApiModelUser {
  @ApiProperty({
    type: 'string',
    example: '5dcb2455-2d03-439f-97e2-9bb48fbe291d',
  })
  public id: string;

  @ApiProperty({ type: 'string', example: 'John' })
  public first_name: string;

  @ApiProperty({ type: 'string', example: 'Doe' })
  public last_name: string;

  @ApiProperty({ type: 'string', example: '12312312312' })
  public cpf: string;

  @ApiProperty({ type: 'string', example: 'seu@email.com' })
  public email: string;

  @ApiProperty({
    enum: UserRoles,
    example: UserRoles.ADMIN,
  })
  role: UserRoles;

  @ApiProperty({
    enum: UserActiveStatus,
    example: `${UserActiveStatus.INACTIVE}`,
  })
  public isActive: UserActiveStatus;

  @ApiProperty({ type: Date, example: '2020-12-21T15:12:00.466Z' })
  public created_at: Date;

  @ApiProperty({ type: Date, example: '2020-12-21T15:12:00.466Z' })
  public updated_at: Date;
}

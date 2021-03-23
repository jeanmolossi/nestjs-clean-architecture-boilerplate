import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '@/core/common/enums/UserEnums';

export class HttpRestApiModelAuthUser {
  @ApiProperty({
    type: 'string',
    example: '5dcb2455-2d03-439f-97e2-9bb48fbe291d',
  })
  public id: string;

  @ApiProperty({ type: 'string', example: 'Primeiro nome' })
  public first_name: string;

  @ApiProperty({ type: 'string', example: 'Sobrenome' })
  public last_name: string;

  @ApiProperty({ type: 'string', example: '12345678910' })
  public cpf: string;

  @ApiProperty({ type: 'string', example: 'seu@email.com' })
  public email: string;

  @ApiProperty({
    enum: UserRoles,
    example: UserRoles.ADMIN,
  })
  role: UserRoles;
}

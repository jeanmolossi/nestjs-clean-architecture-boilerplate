import { ApiProperty } from '@nestjs/swagger';

export class HttpRestApiModelCredentials {
  @ApiProperty({ type: 'string', example: 'seu@email.com' })
  email: string;

  @ApiProperty({ type: 'string', example: '123456' })
  password: string;
}

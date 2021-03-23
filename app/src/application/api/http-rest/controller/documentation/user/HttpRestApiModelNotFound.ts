import { ApiProperty } from '@nestjs/swagger';

export class HttpRestApiModelNotFound {
  @ApiProperty({ type: 'number', example: 404 })
  statusCode: number;

  @ApiProperty({
    type: 'string',
    example:
      'Usuário não encontrado. Identificação não consta na base de dados',
  })
  message: string;

  @ApiProperty({ type: 'number', example: 1608655479889 })
  timestamp: number;
}

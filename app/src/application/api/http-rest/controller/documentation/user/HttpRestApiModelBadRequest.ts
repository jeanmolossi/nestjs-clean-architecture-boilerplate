import { ApiProperty } from '@nestjs/swagger';

export class HttpRestApiModelBadRequest {
  @ApiProperty({ type: 'number', example: 400 })
  statusCode: number;

  @ApiProperty({ type: 'string', example: 'Este e-mail já está em uso' })
  message: string;

  @ApiProperty({ type: 'number', example: 1608655479889 })
  timestamp: number;
}

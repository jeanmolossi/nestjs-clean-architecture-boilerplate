import { ApiProperty } from '@nestjs/swagger';
import { IHttpRestApiModelResponse } from './IHttpRestApiModelResponse';

export class HttpRestApiCreatedBaseResponse<T>
  implements IHttpRestApiModelResponse<T> {
  @ApiProperty({ type: 'number', example: 201 })
  statusCode: number;

  @ApiProperty({ type: 'string', example: 'Created' })
  message: string;

  data: T;

  @ApiProperty({ type: 'number', example: Date.now() })
  timestamp: number;
}

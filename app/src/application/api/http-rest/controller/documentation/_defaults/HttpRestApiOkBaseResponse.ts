import { ApiProperty } from '@nestjs/swagger';
import { IHttpRestApiModelResponse } from './IHttpRestApiModelResponse';

export class HttpRestApiOkBaseResponse<T>
  implements IHttpRestApiModelResponse<T> {
  @ApiProperty({ type: 'number', example: 200 })
  statusCode: number;

  @ApiProperty({ type: 'string', example: 'OK' })
  message: string;

  data: T;

  @ApiProperty({ type: 'number', example: Date.now() })
  timestamp: number;
}

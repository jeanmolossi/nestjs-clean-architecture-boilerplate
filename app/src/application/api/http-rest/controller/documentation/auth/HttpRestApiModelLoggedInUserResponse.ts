import { ApiProperty } from '@nestjs/swagger';
import { HttpRestApiModelLoggedInUser } from './HttpRestApiModelLoggedInUser';

export class HttpRestApiModelLoggedInUserResponse {
  @ApiProperty({ type: 'number', example: 200 })
  statusCode: number;

  @ApiProperty({ type: 'string', example: 'OK' })
  message: string;

  @ApiProperty({
    type: HttpRestApiModelLoggedInUser,
  })
  data: HttpRestApiModelLoggedInUser;

  @ApiProperty({ type: 'number', example: Date.now() })
  timestamp: number;
}

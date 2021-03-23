import { ApiProperty } from '@nestjs/swagger';
import { HttpRestApiModelAuthUser } from './HttpRestApiModelAuthUser';

export class HttpRestApiModelLoggedInUser {
  @ApiProperty({
    type: HttpRestApiModelAuthUser,
  })
  user: HttpRestApiModelAuthUser;

  @ApiProperty({
    type: 'string',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk5OGZjM2RjLWM0ZmItN...',
  })
  accessToken: string;
}

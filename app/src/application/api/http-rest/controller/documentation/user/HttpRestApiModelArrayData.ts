/* eslint-disable @typescript-eslint/ban-types */
import { ApiProperty } from '@nestjs/swagger';
import { HttpRestApiOkBaseResponse } from '../_defaults/HttpRestApiOkBaseResponse';
import { HttpRestApiModelUser } from './HttpRestApiModelUser';

export class HttpRestApiModelArrayData extends HttpRestApiOkBaseResponse<
  HttpRestApiModelUser[]
> {
  @ApiProperty({
    type: HttpRestApiModelUser,
    isArray: true,
  })
  data: HttpRestApiModelUser[];
}

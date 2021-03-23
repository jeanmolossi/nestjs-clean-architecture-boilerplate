/* eslint-disable @typescript-eslint/ban-types */
import { ApiProperty } from '@nestjs/swagger';
import { HttpRestApiOkBaseResponse } from '../_defaults/HttpRestApiOkBaseResponse';
import { HttpRestApiModelUser } from './HttpRestApiModelUser';

export class HttpRestApiModelData extends HttpRestApiOkBaseResponse<
  HttpRestApiModelUser
> {
  @ApiProperty({
    type: HttpRestApiModelUser,
  })
  data: HttpRestApiModelUser;
}

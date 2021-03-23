import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CoreApiResponse } from '@/core/common/api/CoreApiResponse';
import { HttpLocalAuthGuard } from '../auth/guard/HttpLocalAuthGuard';
import { HttpAuthService } from '../auth/HttpAuthService';
import {
  HttpLoggedInUser,
  HttpRequestWithUser,
} from '../auth/type/HttpAuthTypes';
import { HttpRestApiModelCredentials } from './documentation/auth/HttpRestApiModelCredentials';
import { HttpRestApiModelLoggedInUserResponse } from './documentation/auth/HttpRestApiModelLoggedInUserResponse';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: HttpAuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(HttpLocalAuthGuard)
  @ApiBody({ type: HttpRestApiModelCredentials })
  @ApiOkResponse({ type: HttpRestApiModelLoggedInUserResponse })
  public async login(
    @Request() request: HttpRequestWithUser,
  ): Promise<CoreApiResponse<HttpLoggedInUser>> {
    return CoreApiResponse.success(this.authService.login(request.user));
  }
}

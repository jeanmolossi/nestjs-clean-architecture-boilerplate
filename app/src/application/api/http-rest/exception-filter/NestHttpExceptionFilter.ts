import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { CoreApiResponse } from '@/core/common/api/CoreApiResponse';
import { Code } from '@/core/common/code/Code';
import { Exception } from '@/core/common/exception/Exception';
import { Response } from 'express';

@Catch()
export class NestHttpExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost): void {
    const response: Response = host.switchToHttp().getResponse();

    let errorResponse: CoreApiResponse<unknown> = CoreApiResponse.error(
      Code.INTERNAL_SERVER_ERROR.code,
      error.message,
      error.stack,
    );

    errorResponse = this.handleNestError(error, errorResponse);
    errorResponse = this.handleCoreException(error, errorResponse);

    const errorCode =
      errorResponse.statusCode > 505 ? 500 : errorResponse.statusCode;

    response.status(errorCode).json(errorResponse);
  }

  private handleNestError(
    error: Error,
    errorResponse: CoreApiResponse<unknown>,
  ): CoreApiResponse<unknown> {
    if (error instanceof HttpException) {
      return CoreApiResponse.error(error.getStatus(), error.message, null);
    }

    if (error instanceof UnauthorizedException) {
      return CoreApiResponse.error(
        Code.UNAUTHORIZED_ERROR.code,
        Code.UNAUTHORIZED_ERROR.message,
      );
    }

    return errorResponse;
  }

  private handleCoreException(
    error: Error,
    errorResponse: CoreApiResponse<unknown>,
  ): CoreApiResponse<unknown> {
    if (error instanceof Exception) {
      return CoreApiResponse.error(
        error.code || Code.INTERNAL_SERVER_ERROR.code,
        error.message || Code.INTERNAL_SERVER_ERROR.message,
        error.data,
      );
    }

    return errorResponse;
  }
}

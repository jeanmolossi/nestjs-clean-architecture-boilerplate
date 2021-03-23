import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { HttpRequestWithUser } from '../type/HttpAuthTypes';

export const HttpUser: () => any = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request: HttpRequestWithUser = context.switchToHttp().getRequest();
    return request.user;
  },
);

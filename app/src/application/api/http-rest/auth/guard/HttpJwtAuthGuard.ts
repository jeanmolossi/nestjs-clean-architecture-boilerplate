import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Nullable } from '@/core/common';
import { Observable } from 'rxjs';
import { HttpUserPayload } from '../type/HttpAuthTypes';

@Injectable()
export class HttpJwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<T = HttpUserPayload>(err: Nullable<Error>, user: T): T {
    if (err || !user) {
      throw err ||
        new UnauthorizedException('Token de acesso inválido ou inexistente');
    }

    return user;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Code } from '@/core/common/code/Code';
import { Exception } from '@/core/common/exception/Exception';
import { CoreAssert } from '@/core/common/util/assert/CoreAssert';
import { User } from '@/core/domain/user';
import { EnvironmentService } from '@/infrastructure/config/environment/environment.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { HttpAuthService } from '../HttpAuthService';
import { HttpJwtPayload, HttpUserPayload } from '../type/HttpAuthTypes';

@Injectable()
export class HttpJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(HttpAuthService)
    private authService: HttpAuthService,
    @Inject(EnvironmentService)
    private environmentService: EnvironmentService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environmentService.get('ACCESS_TOKEN_SECRET'),
    });
  }

  public async validate(payload: HttpJwtPayload): Promise<HttpUserPayload> {
    const { id } = payload;

    const user: User = CoreAssert.notEmpty(
      await this.authService.getUser(id),
      Exception.new({
        code: Code.UNAUTHORIZED_ERROR,
        message: 'Credenciais expiradas',
      }),
    );

    return user.getUserInfo();
  }
}

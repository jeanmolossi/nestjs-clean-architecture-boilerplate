import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HttpAuthService } from '@/application/api/http-rest/auth/HttpAuthService';
import { HttpUserPayload } from '@/application/api/http-rest/auth/type/HttpAuthTypes';
import { Code } from '@/core/common/code/Code';
import { Exception } from '@/core/common/exception/Exception';
import { CoreAssert } from '@/core/common/util/assert/CoreAssert';
import { EnvironmentService } from '@/infrastructure/config/environment/environment.service';
import { Strategy } from 'passport-local';

@Injectable()
export class HttpLocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(HttpAuthService)
    private authService: HttpAuthService,
    @Inject(EnvironmentService)
    private enviromentService: EnvironmentService,
  ) {
    super({
      usernameField: enviromentService.get('LOGIN_USERNAME_FIELD'),
      passwordField: enviromentService.get('LOGIN_PASSWORD_FIELD'),
    });
  }

  public async validate(
    email: string,
    password: string,
  ): Promise<HttpUserPayload> {
    const user: HttpUserPayload = CoreAssert.notEmpty(
      await this.authService.validateUser(email, password),
      Exception.new({ code: Code.WRONG_CREDENTIALS_ERROR }),
    );

    return user;
  }
}

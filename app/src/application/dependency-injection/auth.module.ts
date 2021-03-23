import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HttpAuthService } from '@/application/api/http-rest/auth/HttpAuthService';
import { HttpJwtStrategy } from '@/application/api/http-rest/auth/passport/HttpJwtStrategy';
import { HttpLocalStrategy } from '@/application/api/http-rest/auth/passport/HttpLocalStrategy';
import { AuthController } from '@/application/api/http-rest/controller/auth.controller';
import { EnvironmentModule } from '@/infrastructure/config/environment/environment.module';
import { EnvironmentService } from '@/infrastructure/config/environment/environment.service';
import { UserModule } from './user.module';

const JWT_MODULE = JwtModule.registerAsync({
  imports: [EnvironmentModule],
  inject: [EnvironmentService],
  useFactory: (environmentService: EnvironmentService): JwtModuleOptions => ({
    secret: environmentService.get('ACCESS_TOKEN_SECRET'),
    signOptions: {
      expiresIn: `${environmentService.get('ACCESS_TOKEN_TTL_IN_MINUTES')}m`,
    },
  }),
});

@Module({
  controllers: [AuthController],
  imports: [PassportModule, EnvironmentModule, JWT_MODULE, UserModule],
  providers: [
    EnvironmentService,
    HttpAuthService,
    HttpLocalStrategy,
    HttpJwtStrategy,
  ],
})
export class AuthModule {}

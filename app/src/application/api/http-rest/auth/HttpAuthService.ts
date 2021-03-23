import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserActiveStatus } from '@/core/common';
import { Optional } from '@/core/common/type/CommonTypes';
import { IUserRepositoryPort, User, UserDITokens } from '@/core/domain/user';
import {
  HttpJwtPayload,
  HttpLoggedInUser,
  HttpUserPayload,
} from './type/HttpAuthTypes';

@Injectable()
export class HttpAuthService {
  constructor(
    @Inject(UserDITokens.UserRepository)
    private readonly userRepository: IUserRepositoryPort,

    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(
    email: string,
    password: string,
  ): Promise<HttpUserPayload> {
    const user: Optional<User> = await this.userRepository.findUser({ email });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    if (user.isActive !== UserActiveStatus.ACTIVE) {
      throw new UnauthorizedException('Acesso não autorizado');
    }

    const isPasswordValid = user.validatePassword(password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return user.getUserInfo();
  }

  public login(user: HttpUserPayload): HttpLoggedInUser {
    const { id } = user;

    const payload: HttpJwtPayload = { id };
    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  public async getUser(userId: string): Promise<Optional<User>> {
    return this.userRepository.findUser({ id: userId });
  }
}

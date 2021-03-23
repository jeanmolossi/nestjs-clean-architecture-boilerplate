import { Module } from '@nestjs/common';
import { CoreDITokens } from '@/core/common';
import { UserDITokens } from '@/core/domain/user';
import { CreateUserService } from '@/core/service/user/usecase/CreateUserService';
import { FindAllUsersService } from '@/core/service/user/usecase/FindAllUsersService';
import { FindUserService } from '@/core/service/user/usecase/FindUserService';
import { UpdateUserService } from '@/core/service/user/usecase/UpdateUserService';
import { TypeOrmUserRepositoryAdapter } from '@/infrastructure/adapter/persistence/typeorm/user/user.repository';
import { TransactionalUseCaseWrapper } from '@/infrastructure/transaction/TransactionalUseCaseWrapper';
import { Connection } from 'typeorm';
import { UserController } from '../api/http-rest/controller/user.controller';

@Module({
  controllers: [UserController],
  providers: [
    /** @section PersistenceProviders */
    {
      provide: UserDITokens.UserRepository,
      inject: [Connection],
      useFactory: connection =>
        connection.getCustomRepository(TypeOrmUserRepositoryAdapter),
    },
    /** @section UseCaseProvider */
    {
      inject: [UserDITokens.UserRepository],
      provide: UserDITokens.CreateUserUseCase,
      useFactory: userRepository => new CreateUserService(userRepository),
    },
    {
      inject: [UserDITokens.UserRepository],
      provide: UserDITokens.FindUserUseCase,
      useFactory: userRepository => new FindUserService(userRepository),
    },
    {
      inject: [UserDITokens.UserRepository],
      provide: UserDITokens.FindAllUsersUseCase,
      useFactory: userRepository => new FindAllUsersService(userRepository),
    },
    {
      inject: [UserDITokens.UserRepository, CoreDITokens.EventBus],
      provide: UserDITokens.UpdateUserUseCase,
      useFactory: userRepository => {
        const service: UpdateUserService = new UpdateUserService(
          userRepository,
        );
        return new TransactionalUseCaseWrapper(service);
      },
    },
  ],
  exports: [UserDITokens.UserRepository],
})
export class UserModule {}

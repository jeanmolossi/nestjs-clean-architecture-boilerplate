import { Test, TestingModule } from '@nestjs/testing';
import {
  FindUserUseCase,
  IUserRepositoryPort,
  UserDITokens,
} from '@/core/domain/user';
import { UserUseCaseDTO } from '@/core/domain/user/usecase/dto/UserUseCaseDTO';
import { FindUserService } from '@/core/service/user/usecase/FindUserService';
import { TypeOrmUserRepositoryAdapter } from '@/infrastructure/adapter/persistence/typeorm/user/user.repository';
import { mockUserEntity } from '@test/unit/core/domain/user/mocks';

describe('FindAllUsersService', () => {
  let findUserService: FindUserUseCase;
  let userRepository: IUserRepositoryPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserDITokens.FindUserUseCase,
          useFactory: userRepositoryInject =>
            new FindUserService(userRepositoryInject),
          inject: [UserDITokens.UserRepository],
        },
        {
          provide: UserDITokens.UserRepository,
          useClass: TypeOrmUserRepositoryAdapter,
        },
      ],
    }).compile();

    findUserService = module.get<FindUserUseCase>(UserDITokens.FindUserUseCase);

    userRepository = module.get<IUserRepositoryPort>(
      UserDITokens.UserRepository,
    );
  });

  describe('execute', () => {
    test('Deve retornar um usuário cadastrado com um id válido', async () => {
      const fakeUser = await mockUserEntity();

      jest
        .spyOn(userRepository, 'findUser')
        .mockImplementationOnce(async () => fakeUser);

      const user = await findUserService.execute(null, {
        id: fakeUser.getId(),
      });

      const finalUserList = UserUseCaseDTO.newFromUser(fakeUser);

      expect(user).toMatchObject(finalUserList);
    });
  });
});

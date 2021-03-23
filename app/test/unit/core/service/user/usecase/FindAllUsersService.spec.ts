import { Test, TestingModule } from '@nestjs/testing';
import {
  FindAllUsersUseCase,
  IUserRepositoryPort,
  UserDITokens,
} from '@/core/domain/user';
import { FindAllUsersService } from '@/core/service/user/usecase/FindAllUsersService';
import { TypeOrmUserRepositoryAdapter } from '@/infrastructure/adapter/persistence/typeorm/user/user.repository';

describe('FindAllUsersService', () => {
  let findAllUsersService: FindAllUsersUseCase;
  let userRepository: IUserRepositoryPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserDITokens.FindAllUsersUseCase,
          useFactory: userRepositoryInject =>
            new FindAllUsersService(userRepositoryInject),
          inject: [UserDITokens.UserRepository],
        },
        {
          provide: UserDITokens.UserRepository,
          useClass: TypeOrmUserRepositoryAdapter,
        },
      ],
    }).compile();

    findAllUsersService = module.get<FindAllUsersUseCase>(
      UserDITokens.FindAllUsersUseCase,
    );

    userRepository = module.get<IUserRepositoryPort>(
      UserDITokens.UserRepository,
    );
  });

  describe('execute', () => {
    test('Deve retornar um array com os usuários cadastrados', async () => {
      jest
        .spyOn(userRepository, 'findAll')
        .mockImplementationOnce(async () => []);

      const usersList = await findAllUsersService.execute();

      expect(usersList).toEqual([]);
    });
  });
});

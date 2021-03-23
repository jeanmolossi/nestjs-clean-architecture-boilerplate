import { Test, TestingModule } from '@nestjs/testing';
import { Code } from '@/core/common/code/Code';
import { UserActiveStatus, UserRoles } from '@/core/common/enums/UserEnums';
import { Exception } from '@/core/common/exception/Exception';
import { ClassValidationDetails } from '@/core/common/util/class-validator/ClassValidator';
import { UserDITokens } from '@/core/domain/user/di/UserDITokens';
import { User } from '@/core/domain/user/entity/User';
import { IUserRepositoryPort } from '@/core/domain/user/port/persistence/UserRepositoryPort';
import { ICreateUserPort } from '@/core/domain/user/port/usecase/CreateUserPort';
import { CreateUserUseCase } from '@/core/domain/user/usecase/CreateUserUseCase';
import { UserUseCaseDTO } from '@/core/domain/user/usecase/dto/UserUseCaseDTO';
import { CreateUserService } from '@/core/service/user/usecase/CreateUserService';
import { TypeOrmUserRepositoryAdapter } from '@/infrastructure/adapter/persistence/typeorm/user/user.repository';
import {
  mockUserEntity,
  mockCreateUserPort,
} from '@test/unit/core/domain/user/mocks';
import { v4 } from 'uuid';

describe('CreateUserService', () => {
  let createUserService: CreateUserUseCase;
  let userRepository: IUserRepositoryPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserDITokens.CreateUserUseCase,
          useFactory: userRepositoryInject =>
            new CreateUserService(userRepositoryInject),
          inject: [UserDITokens.UserRepository],
        },
        {
          provide: UserDITokens.UserRepository,
          useClass: TypeOrmUserRepositoryAdapter,
        },
      ],
    }).compile();

    createUserService = module.get<CreateUserUseCase>(
      UserDITokens.CreateUserUseCase,
    );
    userRepository = module.get<IUserRepositoryPort>(
      UserDITokens.UserRepository,
    );
  });

  describe('execute', () => {
    test('Espera-se que seja criado um usuário', async () => {
      const mockUserId: string = v4();

      jest
        .spyOn(userRepository, 'findUser')
        .mockImplementation(async () => undefined);

      jest
        .spyOn(userRepository, 'createUser')
        .mockImplementationOnce(async () =>
          mockUserEntity({
            id: mockUserId,
            email: 'john@email.com',
            password: 'hashed-password',
            role: UserRoles.ADMIN,
            isActive: UserActiveStatus.INACTIVE,
          }),
        );

      jest.spyOn(userRepository, 'createUser').mockClear();

      const createUserPort: ICreateUserPort = mockCreateUserPort();

      const expectedUser: User = await mockUserEntity({
        id: mockUserId,
        email: createUserPort.email,
        role: createUserPort.role,
        password: createUserPort.password,
        isActive: UserActiveStatus.INACTIVE,
      });

      const expectedUserUseCaseDTO: UserUseCaseDTO = UserUseCaseDTO.newFromUser(
        expectedUser,
      );

      const resultUserUseCaseDTO: UserUseCaseDTO = await createUserService.execute(
        createUserPort,
      );

      Reflect.set(
        resultUserUseCaseDTO,
        'password',
        expectedUserUseCaseDTO.password,
      );

      const resultAddedUser: User = jest.spyOn(userRepository, 'createUser')
        .mock.calls[0][0];

      const expectedInfo = expectedUser.getUserInfo();

      Reflect.set(resultAddedUser, 'id', expectedUser.getId());
      Reflect.set(resultAddedUser, 'email', expectedInfo.email);
      Reflect.set(resultAddedUser, 'password', expectedInfo.password);
      Reflect.set(resultAddedUser, 'isActive', expectedInfo.isActive);
      Reflect.set(resultAddedUser, 'created_at', expectedInfo.created_at);
      Reflect.set(resultAddedUser, 'updated_at', expectedInfo.updated_at);

      expect(resultUserUseCaseDTO).toEqual(expectedUserUseCaseDTO);
      expect(resultAddedUser).toEqual(expectedUser);
    });

    test('Quando o usuário já existe, espera-se que seja lançada uma Exception', async () => {
      jest.spyOn(userRepository, 'findUser').mockImplementation(async () =>
        mockUserEntity({
          id: v4(),
          email: 'john@email.com',
          password: v4(),
          role: UserRoles.ADMIN,
        }),
      );

      expect.hasAssertions();

      try {
        const fakeCreateUserPort: ICreateUserPort = mockCreateUserPort();
        await createUserService.execute(fakeCreateUserPort);
      } catch (e) {
        const exception: Exception<ClassValidationDetails> = e;

        expect(exception).toBeInstanceOf(Exception);
        expect(exception.code).toBe(Code.ENTITY_ALREADY_EXISTS_ERROR.code);
      }
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UserActiveStatus } from '@/core/common';
import { UserDITokens } from '@/core/domain/user/di/UserDITokens';
import { User } from '@/core/domain/user/entity/User';
import { IUserRepositoryPort } from '@/core/domain/user/port/persistence/UserRepositoryPort';
import { IUpdateUserPort } from '@/core/domain/user/port/usecase/UpdateUserPort';
import { UserUseCaseDTO } from '@/core/domain/user/usecase/dto/UserUseCaseDTO';
import { UpdateUserUseCase } from '@/core/domain/user/usecase/UpdateUserUseCase';
import { UpdateUserService } from '@/core/service/user/usecase/UpdateUserService';
import { TypeOrmUserRepositoryAdapter } from '@/infrastructure/adapter/persistence/typeorm/user/user.repository';
import {
  mockUpdateUserPort,
  mockUserEntity,
} from '@test/unit/core/domain/user/mocks';
import { v4 } from 'uuid';

describe('UpdateUserUseCase', () => {
  let updateUserService: UpdateUserUseCase;
  let userRepository: IUserRepositoryPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          inject: [UserDITokens.UserRepository],
          provide: UserDITokens.UpdateUserUseCase,
          useFactory: userRepositoryInject =>
            new UpdateUserService(userRepositoryInject),
        },
        {
          provide: UserDITokens.UserRepository,
          useClass: TypeOrmUserRepositoryAdapter,
        },
      ],
    }).compile();

    updateUserService = module.get<UpdateUserUseCase>(
      UserDITokens.UpdateUserUseCase,
    );

    userRepository = module.get<IUserRepositoryPort>(
      UserDITokens.UserRepository,
    );
  });

  describe('execute', () => {
    test('Espera-se que seja alterado o estado ativo de um usuário', async () => {
      const payloadMock: IUpdateUserPort = mockUpdateUserPort();

      const mockUser = await mockUserEntity();

      const mockUpdatedUser: User = await mockUserEntity({
        isActive: UserActiveStatus.BLOCKED,
        email: 'valid-john@email.com',
      });

      jest
        .spyOn(userRepository, 'findUser')
        .mockImplementationOnce(async () => mockUser);

      jest
        .spyOn(userRepository, 'updateUser')
        .mockImplementationOnce(async () => mockUpdatedUser);

      const updatedUser: UserUseCaseDTO = await updateUserService.execute(
        payloadMock,
      );

      const expectedUser = mockUpdatedUser.getUserInfo();

      expect(expectedUser.id).toBe(updatedUser.id);
      expect(expectedUser.isActive).toBe(updatedUser.isActive);
      expect(expectedUser.isActive).toBe(updatedUser.isActive);
    });

    test('Espera-se que seja alterado o estado ativo de um usuário e suas permissões', async () => {
      const mockUserId = v4();

      const payloadMock: IUpdateUserPort = {
        ...mockUpdateUserPort(),
      };

      const mockUser = await mockUserEntity({ id: mockUserId });

      const mockUpdatedUser: User = await mockUserEntity({
        isActive: UserActiveStatus.ACTIVE,
        email: 'valid-john@email.com',
      });

      jest
        .spyOn(userRepository, 'findUser')
        .mockImplementationOnce(async () => mockUser);

      jest
        .spyOn(userRepository, 'updateUser')
        .mockImplementationOnce(async () => mockUpdatedUser);

      const updatedUser: UserUseCaseDTO = await updateUserService.execute(
        payloadMock,
      );

      const expectedUser = mockUpdatedUser.getUserInfo();

      expect(expectedUser.id).toBe(updatedUser.id);
      expect(expectedUser.isActive).toBe(updatedUser.isActive);
      expect(expectedUser.isActive).toBe(updatedUser.isActive);
    });
  });
});

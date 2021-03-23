import { Code, CoreAssert, Exception } from '@/core/common';
import { IUserRepositoryPort, User } from '@/core/domain/user';
import { IUpdateUserPort } from '@/core/domain/user/port/usecase/UpdateUserPort';
import { UserUseCaseDTO } from '@/core/domain/user/usecase/dto/UserUseCaseDTO';
import { UpdateUserUseCase } from '@/core/domain/user/usecase/UpdateUserUseCase';

export class UpdateUserService implements UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepositoryPort) {}

  async execute(payload: IUpdateUserPort): Promise<UserUseCaseDTO> {
    const { id } = payload;

    const issetUser: User = await this.userRepository.findUser({ id });

    CoreAssert.isFalse(
      !issetUser,
      Exception.new({
        code: Code.NOT_FOUND_ERROR,
        message: 'Usuário não encontrado. Não foi possível atualizar',
      }),
    );

    const user: User = await User.new({
      ...issetUser,
      ...payload,
    });

    const userUpdated = await this.userRepository.updateUser(user);

    return UserUseCaseDTO.newFromUser(userUpdated);
  }
}

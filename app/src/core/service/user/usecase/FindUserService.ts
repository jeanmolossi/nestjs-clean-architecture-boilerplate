import { Code } from '@/core/common/code/Code';
import { Exception } from '@/core/common/exception/Exception';
import { CoreAssert } from '@/core/common/util/assert/CoreAssert';
import { IUserFilters } from '@/core/domain/user/entity/type/UserFilters';
import { IUserRepositoryPort } from '@/core/domain/user/port/persistence/UserRepositoryPort';
import { UserUseCaseDTO } from '@/core/domain/user/usecase/dto/UserUseCaseDTO';
import { FindUserUseCase } from '@/core/domain/user/usecase/FindUserUseCase';

export class FindUserService implements FindUserUseCase {
  constructor(private readonly userRepository: IUserRepositoryPort) {}

  async execute(port: null, filters: IUserFilters): Promise<UserUseCaseDTO> {
    CoreAssert.notEmpty(
      filters,
      Exception.new({
        code: Code.BAD_REQUEST_ERROR,
        message: 'Você deve fornecer ao menos um parâmetro de busca',
      }),
    );

    const user = await this.userRepository.findUser(filters);

    CoreAssert.isFalse(
      !user,
      Exception.new({
        code: Code.NOT_FOUND_ERROR,
        message:
          'Usuário não encontrado. A identificação não consta na base de dados',
      }),
    );

    return UserUseCaseDTO.newFromUser(user);
  }
}

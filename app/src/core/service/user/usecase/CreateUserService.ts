import { Code } from '@/core/common/code/Code';
import { Exception } from '@/core/common/exception/Exception';
import { CoreAssert } from '@/core/common/util/assert/CoreAssert';
import { User } from '@/core/domain/user/entity/User';
import { IUserRepositoryPort } from '@/core/domain/user/port/persistence/UserRepositoryPort';
import { ICreateUserPort } from '@/core/domain/user/port/usecase/CreateUserPort';
import { CreateUserUseCase } from '@/core/domain/user/usecase/CreateUserUseCase';
import { UserUseCaseDTO } from '@/core/domain/user/usecase/dto/UserUseCaseDTO';

export class CreateUserService implements CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepositoryPort) {}

  public async execute(payload: ICreateUserPort): Promise<UserUseCaseDTO> {
    const { email } = payload;

    const issetUser = !(await this.userRepository.findUser({ email }));

    CoreAssert.isTrue(
      issetUser,
      Exception.new({
        code: Code.ENTITY_ALREADY_EXISTS_ERROR,
        message: `Este email já está em uso`,
      }),
    );

    const user: User = await User.new(payload);

    const createdUser = await this.userRepository.createUser(user);

    return UserUseCaseDTO.newFromUser(createdUser);
  }
}

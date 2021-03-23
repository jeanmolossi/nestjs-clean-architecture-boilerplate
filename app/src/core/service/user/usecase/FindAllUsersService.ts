import { FindAllUsersUseCase, IUserRepositoryPort } from '@/core/domain/user';
import { IUserFilters } from '@/core/domain/user/entity/type/UserFilters';
import { UserUseCaseDTO } from '@/core/domain/user/usecase/dto/UserUseCaseDTO';

export class FindAllUsersService implements FindAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepositoryPort) {}

  async execute(port: null, filters?: IUserFilters): Promise<UserUseCaseDTO[]> {
    const users = await this.userRepository.findAll(filters);

    return UserUseCaseDTO.newListFromUsers(users);
  }
}

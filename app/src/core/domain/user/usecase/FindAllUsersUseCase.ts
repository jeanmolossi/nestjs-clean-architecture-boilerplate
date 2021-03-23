import { IUseCase } from '@/core/common/usecase/UseCase';
import { IUserFilters } from '../entity/type/UserFilters';
import { UserUseCaseDTO } from './dto/UserUseCaseDTO';

export type FindAllUsersUseCase = IUseCase<
  null,
  UserUseCaseDTO[],
  IUserFilters
>;

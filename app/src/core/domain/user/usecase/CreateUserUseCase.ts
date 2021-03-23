import { IUseCase } from '@/core/common/usecase/UseCase';
import { ICreateUserPort } from '../port/usecase/CreateUserPort';
import { UserUseCaseDTO } from './dto/UserUseCaseDTO';

export type CreateUserUseCase = IUseCase<ICreateUserPort, UserUseCaseDTO>;

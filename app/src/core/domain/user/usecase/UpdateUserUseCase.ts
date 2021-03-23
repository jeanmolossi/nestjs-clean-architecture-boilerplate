import { IUseCase } from '@/core/common';
import { IUpdateUserPort } from '../port/usecase/UpdateUserPort';
import { UserUseCaseDTO } from './dto/UserUseCaseDTO';

export type UpdateUserUseCase = IUseCase<IUpdateUserPort, UserUseCaseDTO>;

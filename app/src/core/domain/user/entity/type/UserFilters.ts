import { UserActiveStatus } from '@/core/common';
import { IDefaultFilters } from '@/core/common/port/persisters/WithFiltersRepositoryPort';
import { UserRole } from 'aws-sdk/clients/workmail';
import { User } from '../User';

export interface IUserFilters<T = User> extends IDefaultFilters<T> {
  first_name?: string;

  last_name?: string;

  cpf?: string;

  email?: string;

  isActive?: UserActiveStatus;

  role?: UserRole;
}

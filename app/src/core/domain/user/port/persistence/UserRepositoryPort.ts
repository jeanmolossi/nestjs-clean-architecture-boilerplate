import { Optional } from '@/core/common';
import { User } from '@/core/domain/user/entity/User';
import { IUserFilters } from '../../entity/type/UserFilters';

export interface IUserRepositoryPort {
  createUser(user: User): Promise<User>;
  findAll(filters?: IUserFilters): Promise<User[]>;
  findUser(filters: IUserFilters): Promise<Optional<User>>;
  deleteUser(filters: IUserFilters): Promise<boolean>;
  updateUser(user: User): Promise<User>;
}

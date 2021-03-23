import { Optional } from '@/core/common/type/CommonTypes';
import { User } from '@/core/domain/user';
import { IUserFilters } from '@/core/domain/user/entity/type/UserFilters';
import { IUserRepositoryPort } from '@/core/domain/user/port/persistence/UserRepositoryPort';
import { EntityRepository, FindConditions } from 'typeorm';
import { BaseRepositoryWithFilters } from '../../base-repository/BaseRepository';
import { TypeOrmUser } from './user.entity';
import { TypeOrmUserMapper } from './user.mapper';

@EntityRepository(TypeOrmUser)
export class TypeOrmUserRepositoryAdapter
  extends BaseRepositoryWithFilters<TypeOrmUser, IUserFilters>
  implements IUserRepositoryPort {
  async findAll(filters?: IUserFilters): Promise<User[]> {
    const ormUsers = await this.find(
      this.withFilters(filters, this.customFilters),
    );

    const domainUsers = TypeOrmUserMapper.toDomainEntities(ormUsers);
    return domainUsers;
  }

  async findUser(filters: IUserFilters): Promise<Optional<User>> {
    const ormUser = await this.findOne(
      this.withFilters(filters, this.customFilters),
    );

    if (!ormUser) {
      return undefined;
    }

    return TypeOrmUserMapper.toDomainEntity(ormUser);
  }

  async createUser(user: User): Promise<User> {
    const ormUser: TypeOrmUser = TypeOrmUserMapper.toOrmEntity(user);

    const newUser = this.create(ormUser);

    await this.save(newUser);

    return TypeOrmUserMapper.toDomainEntity(newUser);
  }

  async deleteUser(filters: IUserFilters): Promise<boolean> {
    const { affected } = await this.delete({ id: filters.id });

    return !!affected;
  }

  async updateUser(user: User): Promise<User> {
    const ormUser: TypeOrmUser = TypeOrmUserMapper.toOrmEntity(user);

    await this.save(ormUser);

    return TypeOrmUserMapper.toDomainEntity(ormUser);
  }

  customFilters(
    decorate_filters?: IUserFilters<User>,
    where?: FindConditions<TypeOrmUser>,
  ): void {
    const {
      first_name,
      last_name,
      cpf,
      email,
      isActive,
      role,
    } = decorate_filters;

    if (first_name) Object.assign(where, { first_name });
    if (last_name) Object.assign(where, { last_name });
    if (cpf) Object.assign(where, { cpf });
    if (email) Object.assign(where, { email });
    if (isActive) Object.assign(where, { isActive });
    if (role) Object.assign(where, { role });
  }
}

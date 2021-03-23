import { User } from '@/core/domain/user';
import { TypeOrmUser } from './user.entity';

export class TypeOrmUserMapper {
  public static toOrmEntity(user: User): TypeOrmUser {
    const ormUser: TypeOrmUser = new TypeOrmUser();

    Object.assign(ormUser, user);

    return ormUser;
  }

  public static toOrmEntities(users: User[]): TypeOrmUser[] {
    return users.map(user => this.toOrmEntity(user));
  }

  public static toDomainEntity(user: TypeOrmUser): User {
    const domainUser: User = new User({
      ...user,
    });

    return domainUser;
  }

  public static toDomainEntities(users: TypeOrmUser[]): User[] {
    return users.map(user => this.toDomainEntity(user));
  }
}

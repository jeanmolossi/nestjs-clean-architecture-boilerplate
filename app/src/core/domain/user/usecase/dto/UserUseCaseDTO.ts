import { UserRoles } from '@/core/common/enums/UserEnums';
import { User } from '@/core/domain/user';
import { Exclude, Expose, plainToClass } from 'class-transformer';

@Exclude()
export class UserUseCaseDTO {
  @Expose()
  public id: string;

  @Expose()
  public first_name: string;

  @Expose()
  public last_name: string;

  @Expose()
  public cpf: string;

  @Expose()
  public email: string;

  @Expose()
  public password: string;

  @Expose()
  public role: UserRoles;

  @Expose()
  public isActive: boolean;

  public static newFromUser(user: User): UserUseCaseDTO {
    const dto: UserUseCaseDTO = plainToClass(UserUseCaseDTO, user);

    return dto;
  }

  public static newListFromUsers(users: User[]): UserUseCaseDTO[] {
    return users.map(user => this.newFromUser(user));
  }
}

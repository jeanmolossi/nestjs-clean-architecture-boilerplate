import { UserActiveStatus, UserRoles } from '@/core/common';
import { IUserFilters } from '@/core/domain/user/entity/type/UserFilters';
import { UserRole } from 'aws-sdk/clients/workmail';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { TypeOrmUser } from '../../persistence/typeorm/user/user.entity';
import { BaseRepositoryFiltersAdapter } from '../base-repository/BaseRepositoryFiltersAdapter';

@Exclude()
export class UserFiltersAdapter
  extends BaseRepositoryFiltersAdapter<TypeOrmUser>
  implements IUserFilters {
  @Expose()
  @IsString()
  @IsOptional()
  id?: string;

  @Expose()
  @IsString()
  @IsOptional()
  first_name?: string;

  @Expose()
  @IsString()
  @IsOptional()
  last_name?: string;

  @Expose()
  @IsString()
  @IsOptional()
  cpf?: string;

  @Expose()
  @IsEmail()
  @IsOptional()
  email?: string;

  @Expose()
  @IsEnum(UserActiveStatus)
  @IsOptional()
  isActive?: UserActiveStatus;

  @Expose()
  @IsEnum(UserRoles)
  @IsOptional()
  role?: UserRole;

  public static async new(payload: IUserFilters): Promise<UserFiltersAdapter> {
    const adapter: UserFiltersAdapter = plainToClass(
      UserFiltersAdapter,
      payload,
    );

    await adapter.validate();

    return adapter;
  }
}

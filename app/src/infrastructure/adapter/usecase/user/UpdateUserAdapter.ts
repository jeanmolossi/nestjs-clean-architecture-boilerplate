import {
  Optional,
  UseCaseValidatableAdapter,
  UserActiveStatus,
  UserRoles,
} from '@/core/common';
import { IUpdateUserPort } from '@/core/domain/user/port/usecase/UpdateUserPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

@Exclude()
export class UpdateUserAdapter extends UseCaseValidatableAdapter
  implements IUpdateUserPort {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  @IsOptional()
  first_name: Optional<string>;

  @Expose()
  @IsString()
  @IsOptional()
  last_name: Optional<string>;

  @Expose()
  @IsString()
  @IsOptional()
  cpf: Optional<string>;

  @Expose()
  @IsEmail()
  @IsOptional()
  email: Optional<string>;

  @Expose()
  @IsOptional()
  @IsEnum(UserRoles)
  role: Optional<UserRoles>;

  @Expose()
  @IsOptional()
  @IsEnum(UserActiveStatus)
  isActive: Optional<UserActiveStatus>;

  @Expose()
  @IsOptional()
  updated_at: Optional<Date>;

  static async new(payload: IUpdateUserPort): Promise<UpdateUserAdapter> {
    const adapter: UpdateUserAdapter = plainToClass(UpdateUserAdapter, payload);

    await adapter.validate();

    return adapter;
  }
}

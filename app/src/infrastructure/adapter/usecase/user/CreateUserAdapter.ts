import { Optional } from '@/core/common';
import { UseCaseValidatableAdapter } from '@/core/common/adapter/usecase/UseCaseValidatableAdapter';
import { UserActiveStatus, UserRoles } from '@/core/common/enums/UserEnums';
import { ICreateUserPort } from '@/core/domain/user/port/usecase/CreateUserPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@Exclude()
export class CreateUserAdapter extends UseCaseValidatableAdapter
  implements ICreateUserPort {
  id: Optional<string>;

  @Expose()
  @IsString()
  first_name: string;

  @Expose()
  @IsString()
  last_name: string;

  @Expose()
  @IsString()
  cpf: string;

  @Expose()
  @IsEmail(
    { allow_display_name: false },
    { message: 'Você deve preencher um e-mail válido' },
  )
  @IsNotEmpty({ message: 'O campo de e-mail não pode estar vazio' })
  email: string;

  @Expose()
  @IsString()
  @MinLength(6, { message: 'A senha deve conter pelo menos 6 caracteres' })
  @IsNotEmpty({ message: 'O campo de senha não pode estar vazio' })
  password: string;

  @Expose()
  @IsEnum(UserRoles, { message: 'Valor não permitido' })
  @IsOptional()
  role: UserRoles;

  @Expose()
  @IsOptional()
  @IsEnum(UserActiveStatus)
  isActive: Optional<UserActiveStatus>;

  created_at: Optional<Date>;

  updated_at: Optional<Date>;

  public static async new(
    payload: ICreateUserPort,
  ): Promise<CreateUserAdapter> {
    const adapter: CreateUserAdapter = plainToClass(CreateUserAdapter, payload);

    await adapter.validate();

    return adapter;
  }
}

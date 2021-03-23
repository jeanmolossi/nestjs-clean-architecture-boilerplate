import { Optional } from '@/core/common';
import { Entity } from '@/core/common/entity/Entity';
import { UserActiveStatus, UserRoles } from '@/core/common/enums/UserEnums';
import { compareSync, hashSync } from 'bcryptjs';
import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { v4 } from 'uuid';
import { UserInfo } from './type/CommonTypes';
import { CreateUserEntityPayload } from './type/CreateUserEntityPayload';

export class User extends Entity<string> {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  cpf: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserRoles)
  @IsOptional()
  role: Optional<UserRoles>;

  @IsEnum(UserActiveStatus)
  @IsOptional()
  isActive: UserActiveStatus;

  @IsDate()
  @IsOptional()
  created_at: Optional<Date>;

  @IsDate()
  @IsOptional()
  updated_at: Optional<Date>;

  constructor({
    id = v4(),
    first_name,
    last_name,
    cpf,
    email,
    password,
    role,
    isActive = UserActiveStatus.INACTIVE,
    created_at = new Date(),
    updated_at = new Date(),
  }: CreateUserEntityPayload) {
    super();

    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.cpf = cpf;
    this.role = role;
    this.isActive = isActive;
    this.created_at = created_at;
    this.updated_at = updated_at;

    this.email = email;
    this.password = password;
  }

  public async hashPassword(): Promise<void> {
    this.password = hashSync(this.password, 9);

    await this.validate();
  }

  public validatePassword(incommingPassword: string): boolean {
    return compareSync(incommingPassword, this.password);
  }

  public getUserInfo(): UserInfo {
    const user: UserInfo = {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      cpf: this.cpf,
      email: this.email,
      role: this.role,
      password: this.password,
      isActive: this.isActive,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };

    return user;
  }

  public static async new(payload: CreateUserEntityPayload): Promise<User> {
    const user = new User(payload);
    await user.hashPassword();
    await user.validate();

    return user;
  }
}

import { UserActiveStatus, UserRoles } from '@/core/common';
import {
  CreateUserEntityPayload,
  ICreateUserPort,
  User,
  UserInfo,
} from '@/core/domain/user';
import { IUpdateUserPort } from '@/core/domain/user/port/usecase/UpdateUserPort';
import { v4 } from 'uuid';

export function mockCreateUserEntityPayload(
  id = v4(),
): CreateUserEntityPayload {
  return {
    id,
    first_name: 'John',
    last_name: 'Doe',
    cpf: '12312312312',
    email: 'admin@email.com',
    role: UserRoles.ADMIN,
    password: v4(),
    isActive: UserActiveStatus.ACTIVE,
    created_at: new Date(),
    updated_at: new Date(),
  };
}

export function mockCreateUserPort(): ICreateUserPort {
  return {
    id: v4(),
    first_name: 'John',
    last_name: 'Doe',
    cpf: '12312312312',
    email: 'john@email.com',
    password: 'hashed-password',
    role: UserRoles.ADMIN,
    isActive: UserActiveStatus.ACTIVE,
    created_at: new Date(),
    updated_at: new Date(),
  };
}

export function mockUpdateUserPort(): IUpdateUserPort {
  return {
    id: 'valid-id',
    first_name: 'John',
    last_name: 'Doe',
    cpf: '12312312312',
    email: 'johndoe@email.com',
    role: UserRoles.ADMIN,
    isActive: UserActiveStatus.ACTIVE,
    updated_at: new Date(),
  };
}

interface IFakeUserInfo {
  id?: string;
}

export function mockFakeUserInfo({ id = v4() }: IFakeUserInfo = {}): UserInfo {
  return {
    id,
    first_name: 'John',
    last_name: 'Doe',
    cpf: '12312312312',
    email: 'john@doe.com',
    isActive: UserActiveStatus.INACTIVE,
    role: UserRoles.ADMIN,
  };
}

interface IFakeUserEntityPayload {
  id?: string;
  name?: string;
  lastName?: string;
  cpf?: string;
  email?: string;
  role?: UserRoles;
  password?: string;
  isActive?: UserActiveStatus;
  created_at?: Date;
  updated_at?: Date;
}

export async function mockUserEntity({
  id,
  name = 'John',
  lastName = 'Doe',
  cpf = '12312312312',
  email = 'guest@email.com',
  role = UserRoles.ADMIN,
  password = v4(),
  isActive = UserActiveStatus.INACTIVE,
  created_at = new Date(),
  updated_at = new Date(),
}: IFakeUserEntityPayload = {}): Promise<User> {
  return User.new({
    id,
    first_name: name,
    last_name: lastName,
    cpf,
    email,
    role,
    password,
    isActive,
    created_at,
    updated_at,
  });
}

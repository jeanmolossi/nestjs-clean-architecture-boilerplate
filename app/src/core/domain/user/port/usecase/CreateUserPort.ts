import { Optional, UserActiveStatus, UserRoles } from '@/core/common';

export interface ICreateUserPort {
  id: Optional<string>;
  first_name: string;
  last_name: string;
  cpf: string;
  email: string;
  password: string;
  role: UserRoles;
  isActive: Optional<UserActiveStatus>;
  created_at: Optional<Date>;
  updated_at: Optional<Date>;
}

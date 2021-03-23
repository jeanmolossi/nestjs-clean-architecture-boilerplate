import { Optional, UserActiveStatus, UserRoles } from '@/core/common';

export interface IUpdateUserPort {
  id: string;
  first_name: Optional<string>;
  last_name: Optional<string>;
  cpf: Optional<string>;
  email: Optional<string>;
  role: Optional<UserRoles>;
  isActive: Optional<UserActiveStatus>;
  updated_at: Optional<Date>;
}

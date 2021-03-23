import { Optional } from '@/core/common';
import { UserActiveStatus, UserRoles } from '@/core/common/enums/UserEnums';

export type CreateUserEntityPayload = {
  id: Optional<string>;

  first_name: Optional<string>;

  last_name: Optional<string>;

  cpf: Optional<string>;

  email: Optional<string>;

  password: Optional<string>;

  role: Optional<UserRoles>;

  isActive: Optional<UserActiveStatus>;

  created_at: Optional<Date>;

  updated_at: Optional<Date>;
};

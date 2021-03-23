import { UserActiveStatus, UserRoles } from '@/core/common/enums/UserEnums';

/**
 * @type {IUserRoles} - Definição de nível de usuário
 *
 * @arg {super_admin} - Usuário Root com todas as permissões do sistema e é o único usuário que pode criar outros admins.
 * @arg {admin} - Usuário Root com todas as permissões do sistema exceto a criação de novos admins.
 */
export type IUserRoles = 'super_admin' | 'admin';

export type UserInfo = {
  id: string;
  first_name: string;
  last_name: string;
  cpf: string;
  email: string;
  role: UserRoles;
  password?: string;
  isActive: UserActiveStatus;
  created_at?: Date;
  updated_at?: Date;
};

/**
 * @enum {UserRoles} UserRoles - Definição de nível de usuário
 *
 * @arg {super_admin} super_admin - Usuário Root com todas as permissões do sistema e é o único usuário que pode criar outros admins.
 * @arg {admin} admin - Usuário Root com todas as permissões do sistema exceto a criação de novos admins.
 */
export enum UserRoles {
  'SUPER_ADMIN' = 'super_admin',
  'ADMIN' = 'admin',
}

/**
 * @enum {UserActiveStatus} UserRoles - Definição de nível de usuário
 *
 * @arg {inactive} inactive - Usuário inativo. Sem confirmações de permissões (Default)
 * @arg {blocked} blocked - Usuário bloqueado. Com confirmação de permissão, mas bloqueado (Sem acesso ao sistema)
 * @arg {active} active - Usuário ativo. Com confirmação de permissão e acesso liberado.
 */
export enum UserActiveStatus {
  'INACTIVE' = 'inactive',
  'BLOCKED' = 'blocked',
  'ACTIVE' = 'active',
}

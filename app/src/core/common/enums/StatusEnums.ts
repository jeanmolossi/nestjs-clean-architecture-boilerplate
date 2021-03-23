/* eslint-disable no-shadow */
/**
 * @enum {StatusEnums} StatusEnums - Definição de tipo de estado de registro
 *
 * @arg {SCHEDULED} SCHEDULED - Agendado - Registro agendado, ainda não executado
 * @arg {CREATED} CREATED - Criado - Registro criado.
 * @arg {IN_PROGRESS} IN_PROGRESS - Em progresso - Registro em progresso, em execução
 * @arg {EXECUTED} EXECUTED - Executado - Registro já executado.
 * @arg {BILLING} BILLING - Em faturação - Registro foi para faturamento
 * @arg {BILLED} BILLED - Faturado - Registro faturado
 * @arg {CLOSED} CLOSED - Fechado / finalizado - Registro já finalizado em todos os processos
 * @arg {CANCELED} CANCELED - Cancelado - Registro cancelado
 */
export enum StatusEnums {
  PENDING = 'pending',
  SCHEDULED = 'scheduled',
  REQUESTED = 'requested',
  CREATED = 'created',
  OPENED = 'opened',
  IN_PROGRESS = 'in_progress',
  EXECUTED = 'executed',
  BILLING = 'billing',
  BILLED = 'billed',
  CLOSED = 'closed',
  CANCELED = 'canceled',
}

/* eslint-disable max-classes-per-file */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { StatusEnums } from '@/core/common/enums/StatusEnums';
import {
  IDefaultFilters,
  NonFunctionProperties,
} from '@/core/common/port/persisters/WithFiltersRepositoryPort';
import { v4 } from 'uuid';

enum Order {
  'ASC',
  'DESC',
}

class OrderModelFilter {
  @ApiPropertyOptional({ type: 'string', enum: Order, example: `${Order.ASC}` })
  id?: Order;
}

export class HttpRestApiBaseFilters<Entity = unknown>
  implements IDefaultFilters<Entity> {
  @ApiPropertyOptional({
    type: 'string',
    format: 'date-string',
    example: new Date().toISOString(),
  })
  from?: Date;

  @ApiPropertyOptional({
    type: 'string',
    format: 'date-string',
    example: new Date().toISOString(),
  })
  to?: Date;

  @ApiPropertyOptional({
    enum: StatusEnums,
    example: 'created',
  })
  status?: StatusEnums;

  @ApiPropertyOptional({
    type: 'string',
    example: v4(),
    description: 'Hash identificador',
  })
  id?: string;

  @ApiPropertyOptional({
    type: 'number',
    example: 15,
    default: 10,
    description: 'Limite de resultados por página',
  })
  limit?: number;

  @ApiPropertyOptional({
    type: 'number',
    example: 3,
    default: 1,
    description: 'Número da página de resultados',
  })
  page?: number;

  @ApiPropertyOptional({
    type: OrderModelFilter,
    example: `&order=created_at,desc&order=amount,asc`,
    description: 'Chaves de modelo para ordenação',
  })
  order?: NonFunctionProperties<Entity>;
}

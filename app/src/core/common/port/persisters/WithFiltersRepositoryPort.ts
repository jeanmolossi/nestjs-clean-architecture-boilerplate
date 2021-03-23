import { StatusEnums } from '@/core/common/enums';

export type NonFunctionPropertyNames<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

export type OrderProperty<T, K extends keyof T> = { [P in K]: 'ASC' | 'DESC' };

export type NonFunctionProperties<T> = OrderProperty<
  T,
  NonFunctionPropertyNames<T>
>;

export interface IDefaultFilters<Entity = unknown> {
  from?: Date;
  to?: Date;
  status?: StatusEnums;
  withRelation?: string[];
  id?: string;

  page?: number;
  limit?: number;
  order?: NonFunctionProperties<Entity>;
}

export type FilterReturns<WhereType, RelationsType, OrderType> = {
  where: WhereType;
  relations: RelationsType;
  order: OrderType;
  take: number;
  skip: number;
};

export interface IWithFiltersRepositoryPort<
  FiltersType extends IDefaultFilters,
  WhereType,
  RelationsType,
  OrderType = unknown
> {
  withFilters(
    filters?: FiltersType,
    customFiltersDecorator?: (
      decorate_filters?: FiltersType,
      where?: WhereType,
    ) => WhereType,
  ): FilterReturns<WhereType, RelationsType, OrderType>;
}

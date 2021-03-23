import {
  FilterReturns,
  IDefaultFilters,
  IWithFiltersRepositoryPort,
} from '@/core/common/port/persisters/WithFiltersRepositoryPort';
import { BetweenDatesHelper } from '@/infrastructure/adapter/utils/BetweenDatesHelper';
import { Equal, FindConditions, FindOneOptions } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

export class BaseRepositoryWithFilters<
  Entity,
  Filters extends IDefaultFilters<Entity>
> extends BaseRepository<Entity>
  implements
    IWithFiltersRepositoryPort<
      Filters,
      FindConditions<Entity>,
      FindOneOptions<Entity>['relations'],
      FindOneOptions<Entity>['order']
    > {
  withFilters(
    filters?: Filters,
    customFiltersDecorator?: (
      decorate_filters?: Filters,
      where?: FindConditions<Entity>,
    ) => void,
  ): FilterReturns<
    FindConditions<Entity>,
    FindOneOptions<Entity>['relations'],
    FindOneOptions<Entity>['order']
  > {
    if (!filters)
      return {} as FilterReturns<
        FindConditions<Entity>,
        FindOneOptions<Entity>['relations'],
        FindOneOptions<Entity>['order']
      >;

    const {
      from,
      to,
      status,
      withRelation,
      id,
      order: filterOrder,
      limit = 10,
      page = 1,
    } = filters;

    const where: FindConditions<Entity> = {};
    const relations: FindOneOptions<Entity>['relations'] = [];
    const order: FindOneOptions<Entity>['order'] = {};

    BetweenDatesHelper.between('created_at', where, from, to);

    if (status)
      Object.assign(where, {
        status: Equal(status),
      });

    if (id) Object.assign(where, { id });

    if (filterOrder) {
      const orderArray = filterOrder.toString().split(',');

      const objectOrder = {};

      orderArray.forEach((key, index) => {
        if (index % 2 === 0) {
          Object.assign(objectOrder, {
            [key]: orderArray[index + 1].toUpperCase(),
          });
        }
      });

      Object.assign(order, objectOrder);
    } else {
      Object.assign(order, {
        created_at: 'DESC',
      });
    }

    if (withRelation && withRelation.length)
      withRelation.forEach(relation => relations.push(relation));

    if (customFiltersDecorator) {
      customFiltersDecorator(filters, where);
    }

    return {
      where,
      relations,
      order,
      take: limit,
      skip: limit * (page - 1),
    };
  }
}

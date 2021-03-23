import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IQueryBusPort } from '@/core/common/port/message/QueryBusPort';

@Injectable()
export class NestQueryBusAdapter implements IQueryBusPort {
  constructor(readonly queryBus: QueryBus) {}

  public async sendQuery<TQuery, TQueryResult>(
    query: TQuery,
  ): Promise<TQueryResult> {
    return this.queryBus.execute(query);
  }
}

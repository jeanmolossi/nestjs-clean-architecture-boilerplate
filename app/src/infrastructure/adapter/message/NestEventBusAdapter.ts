import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { IEventBusPort } from '@/core/common/port/message/EventBusPort';

@Injectable()
export class NestEventBusAdapter implements IEventBusPort {
  constructor(private readonly eventBus: EventBus) {}

  public async sendEvent<TEvent>(event: TEvent): Promise<void> {
    return this.eventBus.publish(event);
  }
}

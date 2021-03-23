import { ITransactionalUseCase } from '@/core/common/usecase/TransactionalUseCase';
import { IUseCase } from '@/core/common/usecase/UseCase';
import {
  runOnTransactionCommit,
  runOnTransactionRollback,
  Transactional,
} from 'typeorm-transactional-cls-hooked';

export class TransactionalUseCaseWrapper<TUseCasePort, TUseCaseResult>
  implements IUseCase<TUseCasePort, TUseCaseResult> {
  constructor(
    private readonly useCase: ITransactionalUseCase<
      TUseCasePort,
      TUseCaseResult
    >,
  ) {}

  @Transactional()
  public async execute(port: TUseCasePort): Promise<TUseCaseResult> {
    runOnTransactionRollback(async (error: Error) => {
      if (this.useCase.onRollback) return this.useCase.onRollback(error, port);
      return undefined;
    });

    const result: TUseCaseResult = await this.useCase.execute(port);
    runOnTransactionCommit(async () => {
      if (this.useCase.onCommit) return this.useCase.onCommit(result, port);
      return undefined;
    });

    return result;
  }
}

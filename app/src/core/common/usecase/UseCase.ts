export interface IUseCase<
  UseCasePortType,
  UseCaseResultType,
  FiltersType = unknown
> {
  execute(
    port?: UseCasePortType,
    filters?: FiltersType,
  ): Promise<UseCaseResultType>;
}

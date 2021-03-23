export interface IQueryHandler<T, TResult> {
  handle(query: T): Promise<TResult>;
}

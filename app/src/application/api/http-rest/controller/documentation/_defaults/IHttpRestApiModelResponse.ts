export interface IHttpRestApiModelResponse<T = unknown> {
  statusCode: number;
  message: string;
  data: T;
  timestamp: number;
}

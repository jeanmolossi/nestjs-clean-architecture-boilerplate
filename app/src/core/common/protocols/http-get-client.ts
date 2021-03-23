export interface IHttpGetParams {
  url: string;

  query?: {
    [key: string]: string;
  };

  headers?: {
    [key: string]: unknown;
  };
}

export interface IHttpGetClient<T = unknown> {
  get: (param: IHttpGetParams) => Promise<T>;
}

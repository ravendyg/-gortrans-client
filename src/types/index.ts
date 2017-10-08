export interface IPayload<P> {
  data: P | null;
  error: Error | null;
}

export interface IAction<T, P> {
  type: T;
  payload: IPayload<P>;
}

export interface IConfig {
  apiUrl: string;
}

export interface ICtor<T> {
  new(...args: any[]): T;
}

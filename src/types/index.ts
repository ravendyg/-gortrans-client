export interface IPayload<P> {
  data: P,
  error: Error | null
}

export interface IAction<T, P> {
  type: T,
  payload: IPayload<P>
}

export interface IConfig {
  apiUrl: string
}

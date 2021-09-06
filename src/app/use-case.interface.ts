export interface UseCase<TParams, TResponse> {
  execute(params: TParams): TResponse;
}

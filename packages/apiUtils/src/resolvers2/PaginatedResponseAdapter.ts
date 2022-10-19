import { ApiErrorCode, MoralisApiError, MoralisCore } from '@moralisweb3/core';

export class PaginatedResponseAdapter<Result, JSONResult> {
  public constructor(
    private readonly jsonResponse: JSONResult,
    private readonly deserializeResponse: (jsonResponse: JSONResult, core: MoralisCore) => Result,
    private readonly core: MoralisCore,
    private readonly nextHandler?: () => Promise<PaginatedResponseAdapter<Result, JSONResult>>,
  ) {}

  public get result(): Result {
    return this.deserializeResponse(this.jsonResponse, this.core);
  }

  public get raw(): JSONResult {
    return this.jsonResponse;
  }

  public toJSON(): JSONResult {
    return this.jsonResponse;
  }

  public readonly hasNext = () => !!this.nextHandler;

  public next: () => Promise<PaginatedResponseAdapter<Result, JSONResult>> = () => {
    if (!this.nextHandler) {
      throw new MoralisApiError({
        code: ApiErrorCode.PAGE_LIMIT_EXCEEDED,
        message:
          'Page limit exceeded! Before call this method check an existence of the next page by .hasNext() method.',
      });
    }
    return this.nextHandler();
  };
}

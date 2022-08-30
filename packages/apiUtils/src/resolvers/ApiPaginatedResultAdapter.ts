import { ApiErrorCode, MoralisApiError } from '@moralisweb3/core';
import { ApiResultAdapter } from './ApiResultAdapter';
import { PaginatedResult } from './PaginatedEndpoint';

/**
 * The adapter for a paginated API result.
 */
export class ApiPaginatedResultAdapter<
  Data extends PaginatedResult<unknown>,
  AdaptedData,
  JSONData,
  Params,
> extends ApiResultAdapter<Data, AdaptedData, JSONData, Params> {
  public constructor(
    data: Data,
    adapter: (data: Data, params: Params) => AdaptedData,
    jsonAdapter: (data: AdaptedData) => JSONData,
    params: Params,
    private readonly nextHandler?: () => Promise<ApiPaginatedResultAdapter<Data, AdaptedData, JSONData, Params>>,
  ) {
    super(data, adapter, jsonAdapter, params);
  }

  /**
   * Checks an existence of the next page.
   *
   * @returns `true` if a next page exists, otherwise `false`.
   */
  public hasNext = () => {
    return !!this.nextHandler;
  };

  /**
   * Gets a next page of the paginated result.
   *
   * @returns a new instance of a paginated adapter.
   */
  public next = () => {
    if (!this.nextHandler) {
      throw new MoralisApiError({
        code: ApiErrorCode.PAGE_LIMIT_EXCEEDED,
        message:
          'Page limit exceeded! Before call this method check an existence of the next page by .hasNext() method.',
      });
    }
    return this.nextHandler();
  };

  /**
   * @returns an info about pagination.
   */
  public get pagination() {
    return {
      total: this.data.total,
      page: this.data.page,
      pageSize: this.data.page_size,
      cursor: this.data.cursor,
    };
  }
}

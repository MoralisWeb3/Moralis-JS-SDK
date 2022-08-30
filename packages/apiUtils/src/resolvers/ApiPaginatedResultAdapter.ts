import { ApiErrorCode, MoralisApiError } from '@moralisweb3/core';
import { ApiResultAdapter } from './ApiResultAdapter';
import { PaginatedResult } from './PaginatedEndpoint';

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

  public hasNext = () => {
    return !!this.nextHandler;
  };

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

  public get pagination() {
    return {
      total: this._data.total,
      page: this._data.page,
      pageSize: this._data.page_size,
      cursor: this._data.cursor,
    };
  }
}

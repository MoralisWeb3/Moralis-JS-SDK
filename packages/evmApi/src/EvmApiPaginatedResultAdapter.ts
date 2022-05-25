import { ApiErrorCode, MoralisApiError } from '@moralisweb3/core';
import { EvmApiResultAdapter } from './EvmApiResultAdapter';
import { PaginatedResponse } from './resolvers/PaginatedResolver';

export class EvmApiPaginatedResultAdapter<
  Data extends PaginatedResponse<unknown>,
  AdaptedData,
  JSONData,
> extends EvmApiResultAdapter<Data, AdaptedData, JSONData> {
  private _nextCall?: () => Promise<EvmApiPaginatedResultAdapter<Data, AdaptedData, JSONData>>;

  constructor(
    data: Data,
    adapter: (data: Data) => AdaptedData,
    jsonAdapter: (data: AdaptedData) => JSONData,
    nextCall?: () => Promise<EvmApiPaginatedResultAdapter<Data, AdaptedData, JSONData>>,
  ) {
    super(data, adapter, jsonAdapter);
    this._nextCall = nextCall;
  }

  next = () => {
    if (!this._nextCall) {
      throw new MoralisApiError({
        code: ApiErrorCode.PAGE_LIMIT_EXCEEDED,
        message: 'Cannot call .next(). Page limit exceeded.',
      });
    }

    return this._nextCall();
  };

  get pagination() {
    return {
      total: this._data.total,
      page: this._data.page,
      pageSize: this._data.page_size,
      cursor: this._data.cursor,
    };
  }
}

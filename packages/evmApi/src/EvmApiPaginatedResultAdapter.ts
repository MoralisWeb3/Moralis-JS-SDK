import { ApiErrorCode, MoralisApiError } from '@moralis/core';
import { EvmApiResultAdapter } from './EvmApiResultAdapter';
import { PaginatedResponse } from './resolvers/PaginatedResolver';
import { Camelize } from './utils/toCamelCase';

export class EvmApiPaginatedResultAdapter<
  Data extends PaginatedResponse<AdaptedData>,
  AdaptedData extends unknown,
  JSONData extends unknown,
> extends EvmApiResultAdapter<Data, AdaptedData, JSONData> {
  private _nextCall?: () => Promise<this>;

  constructor(
    data: Data,
    adapter: (data: Data) => AdaptedData,
    jsonAdapter: (data: AdaptedData) => JSONData,
    nextCall?: () => any,
  ) {
    super(data, adapter, jsonAdapter);
    this._nextCall = nextCall;
  }

  get legacy() {
    return this._data;
  }

  get result(): AdaptedData {
    return this._adapter(this._data);
  }

  next() {
    if (this._nextCall) {
      return this._nextCall();
    }
    throw new MoralisApiError({ code: ApiErrorCode.PAGE_LIMIT_ERROR, message: 'page limit exceeded' });
  }

  get pagination(): Camelize<PaginatedResponse<AdaptedData>> {
    return {
      total: this._data.total,
      page: this._data.page,
      pageSize: this._data.page_size,
      cursor: this._data.cursor,
    };
  }
}

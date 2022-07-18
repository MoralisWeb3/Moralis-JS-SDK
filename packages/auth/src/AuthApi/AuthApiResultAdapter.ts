import { ApiErrorCode, EvmAddress, EvmChain, MoralisApiError } from '@moralisweb3/core';
import { MoralisDataObject } from '@moralisweb3/core';

// TODO: cleanup and generalize Api logic with EvmApi logic to separate package
enum AuthApiFormatType {
  // Return the data directly, as is provided by the API
  RAW = 'raw',
  // Return the formatted result of all moralis DataTypes
  JSON = 'JSON',
  // Return class with moralis DataTypes and format functions
  NORMAL = 'normal',
}

export type InputApiResult<Value extends object = object> =
  | {
      [key in keyof Value]: string | boolean | number | null | undefined | InputApiResult;
    }
  | InputApiResult[];

export type AdaptedApiResult<Value extends object = object> =
  | {
      [key in keyof Value]:
        | string
        | boolean
        | number
        | null
        | EvmAddress
        | EvmChain
        | MoralisDataObject
        | AdaptedApiResult;
    }
  | AdaptedApiResult[];

export type JSONApiResult<Value extends object = object> =
  | {
      [key in keyof Value]: string | boolean | number | null | JSONApiResult;
    }
  | JSONApiResult[];

export class AuthApiResultAdapter<Data, AdaptedData, JSONData, Params> {
  protected _data: Data;
  protected _adapter: (data: Data, params: Params) => AdaptedData;
  protected _jsonAdapter: (data: AdaptedData) => JSONData;
  protected _params: Params;

  constructor(
    data: Data,
    adapter: (data: Data, params: Params) => AdaptedData,
    jsonAdapter: (data: AdaptedData) => JSONData,
    params: Params,
  ) {
    this._data = data;
    this._adapter = adapter;
    this._jsonAdapter = jsonAdapter;
    this._params = params;
  }

  get raw() {
    return this._data;
  }

  get result(): AdaptedData {
    return this._adapter(this._data, this._params);
  }

  toJSON() {
    return this._jsonAdapter(this.result);
  }

  format(formatType: AuthApiFormatType.RAW): Data;
  // WIP: add type
  format(formatType: AuthApiFormatType.JSON): unknown;
  format(formatType: AuthApiFormatType.NORMAL): AdaptedData;
  format(formatType: AuthApiFormatType) {
    if (formatType === AuthApiFormatType.RAW) {
      return this.raw;
    }

    if (formatType === AuthApiFormatType.JSON) {
      return this.toJSON();
    }

    if (formatType === AuthApiFormatType.NORMAL) {
      return this.result;
    }

    throw new MoralisApiError({
      code: ApiErrorCode.GENERIC_API_ERROR,
      message: 'provided formatType not supported',
    });
  }
}

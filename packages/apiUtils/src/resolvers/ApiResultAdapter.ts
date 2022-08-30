import { ApiErrorCode, MoralisApiError, MoralisData, MoralisDataObject } from '@moralisweb3/core';

// TODO: make part of core config? The challenge in that case is to make sure it is Typed correctly
export enum ApiFormatType {
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
      [key in keyof Value]: string | boolean | number | null | MoralisData | MoralisDataObject | AdaptedApiResult;
    }
  | AdaptedApiResult[];

export type JSONApiResult<Value extends object = object> =
  | {
      [key in keyof Value]: string | boolean | number | null | JSONApiResult;
    }
  | JSONApiResult[];

/**
 * The adapter for the API result.
 */
export class ApiResultAdapter<Data, AdaptedData, JSONData, Params> {
  public constructor(
    protected readonly data: Data,
    protected readonly adapter: (data: Data, params: Params) => AdaptedData,
    protected readonly jsonAdapter: (data: AdaptedData) => JSONData,
    protected readonly params: Params,
  ) {}

  /**
   * @returns a raw data from the API.
   */
  public get raw() {
    return this.data;
  }

  /**
   * @returns the result adapted into SDK types.
   */
  public get result(): AdaptedData {
    return this.adapter(this.data, this.params);
  }

  /**
   * @returns the result in the JSON format.
   */
  public toJSON(): JSONData {
    return this.jsonAdapter(this.result);
  }

  /**
   * @returns the result in the raw format.
   */
  public format(formatType: ApiFormatType.RAW): Data;

  /**
   * @returns athe result in the JSON format.
   */
  public format(formatType: ApiFormatType.JSON): unknown;

  /**
   * @returns the result adapted into SDK types.
   */
  public format(formatType: ApiFormatType.NORMAL): AdaptedData;

  /**
   * Format the result to a specific format.
   */
  public format(formatType: ApiFormatType) {
    if (formatType === ApiFormatType.RAW) {
      return this.raw;
    }

    if (formatType === ApiFormatType.JSON) {
      return this.toJSON();
    }

    if (formatType === ApiFormatType.NORMAL) {
      return this.result;
    }

    throw new MoralisApiError({
      code: ApiErrorCode.GENERIC_API_ERROR,
      message: 'provided formatType not supported',
    });
  }
}

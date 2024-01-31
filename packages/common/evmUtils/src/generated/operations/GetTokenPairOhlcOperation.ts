import { EvmChain, EvmChainInput, EvmChainJSON } from '../../dataTypes';
import { EvmOhlcIntervalList, EvmOhlcIntervalListValue, EvmOhlcIntervalListInput, EvmOhlcIntervalListJSON } from '../types/EvmOhlcIntervalList';
import { EvmOhlcResponse, EvmOhlcResponseJSON } from '../types/EvmOhlcResponse';

// request parameters:
// - chain ($ref: #/components/schemas/chainList)
// - token0 ($ref: #/paths/~1{token0}~1{token1}~1ohlc/get/parameters/1/schema)
// - token1 ($ref: #/paths/~1{token0}~1{token1}~1ohlc/get/parameters/2/schema)
// - exchange ($ref: #/paths/~1{token0}~1{token1}~1ohlc/get/parameters/3/schema)
// - interval ($ref: #/components/schemas/ohlcIntervalList)
// - price_format ($ref: #/paths/~1{token0}~1{token1}~1ohlc/get/parameters/5/schema)
// - from_date ($ref: #/paths/~1{token0}~1{token1}~1ohlc/get/parameters/6/schema)
// - to_date ($ref: #/paths/~1{token0}~1{token1}~1ohlc/get/parameters/7/schema)
// - limit ($ref: #/paths/~1{token0}~1{token1}~1ohlc/get/parameters/8/schema)
// - cursor ($ref: #/paths/~1{token0}~1{token1}~1ohlc/get/parameters/9/schema)

export interface GetTokenPairOhlcOperationRequest {
  /**
   * @description The chain to query
   */
  readonly chain?: EvmChainInput | EvmChain;
  /**
   * @description The base token address
   */
  readonly token0: string;
  /**
   * @description The quote token address
   */
  readonly token1: string;
  /**
   * @description The factory name or address of the token exchange
   */
  readonly exchange: string;
  /**
   * @description The interval of the ohlc candles
   */
  readonly interval: EvmOhlcIntervalListInput | EvmOhlcIntervalListValue;
  /**
   * @description The price format of the ohlc candles (usd, native)
   */
  readonly priceFormat: string;
  /**
   * @description The date from where to get the ohlc candles (format in seconds or datestring accepted by momentjs).
   */
  readonly fromDate: string;
  /**
   * @description Get ohlc candles up until this date (format in seconds or datestring accepted by momentjs).
   */
  readonly toDate: string;
  /**
   * @description The maximum number of ohlc candles to return (max 100)
   */
  readonly limit?: number;
  /**
   * @description The cursor returned in the previous response (used for getting the next page).
   */
  readonly cursor?: string;
}

export interface GetTokenPairOhlcOperationRequestJSON {
  readonly chain?: EvmChainJSON;
  readonly token0: string;
  readonly token1: string;
  readonly exchange: string;
  readonly interval: EvmOhlcIntervalListJSON;
  readonly price_format: string;
  readonly from_date: string;
  readonly to_date: string;
  readonly limit?: number;
  readonly cursor?: string;
}

export type GetTokenPairOhlcOperationResponse = EvmOhlcResponse;
export type GetTokenPairOhlcOperationResponseJSON = EvmOhlcResponseJSON;

export const GetTokenPairOhlcOperation = {
  operationId: "getTokenPairOhlc",
  groupName: "token",
  httpMethod: "get",
  routePattern: "/{token0}/{token1}/ohlc",
  parameterNames: ["chain","token0","token1","exchange","interval","price_format","from_date","to_date","limit","cursor"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmOhlcResponseJSON): EvmOhlcResponse {
    return EvmOhlcResponse.fromJSON(json);
  },

  serializeRequest(request: GetTokenPairOhlcOperationRequest): GetTokenPairOhlcOperationRequestJSON {
    const chain = request.chain ? EvmChain.create(request.chain) : undefined;
    const token0 = request.token0;
    const token1 = request.token1;
    const exchange = request.exchange;
    const interval = EvmOhlcIntervalList.create(request.interval);
    const priceFormat = request.priceFormat;
    const fromDate = request.fromDate;
    const toDate = request.toDate;
    const limit = request.limit;
    const cursor = request.cursor;
    return {
      chain: chain ? chain.toJSON() : undefined,
      token0: token0,
      token1: token1,
      exchange: exchange,
      interval: interval,
      price_format: priceFormat,
      from_date: fromDate,
      to_date: toDate,
      limit: limit,
      cursor: cursor,
    };
  },

}

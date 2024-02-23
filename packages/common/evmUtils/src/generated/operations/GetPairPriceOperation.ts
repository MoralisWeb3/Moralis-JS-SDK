import { EvmChain, EvmChainInput, EvmChainJSON, EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { EvmGetPairPrice, EvmGetPairPriceJSON } from '../types/EvmGetPairPrice';

// request parameters:
// - chain ($ref: #/components/schemas/chainList)
// - to_block ($ref: #/paths/~1{token0_address}~1{token1_address}~1price/get/parameters/1/schema)
// - to_date ($ref: #/paths/~1{token0_address}~1{token1_address}~1price/get/parameters/2/schema)
// - token0_address ($ref: #/paths/~1{token0_address}~1{token1_address}~1price/get/parameters/3/schema)
// - token1_address ($ref: #/paths/~1{token0_address}~1{token1_address}~1price/get/parameters/4/schema)
// - exchange ($ref: #/paths/~1{token0_address}~1{token1_address}~1price/get/parameters/5/schema)

export interface GetPairPriceOperationRequest {
  /**
   * @description The chain to query
   */
  readonly chain?: EvmChainInput | EvmChain;
  /**
   * @description The block number to get the reserves from
   */
  readonly toBlock?: number;
  /**
   * @description Get the price up to this date (format in seconds or datestring accepted by momentjs)
   * * Provide the param 'to_block' or 'to_date'
   * * If 'to_date' and 'to_block' are provided, 'to_block' will be used.
   */
  readonly toDate?: Date;
  /**
   * @description The token0 address
   */
  readonly token0Address: EvmAddressInput | EvmAddress;
  /**
   * @description The token1 address
   */
  readonly token1Address: EvmAddressInput | EvmAddress;
  /**
   * @description The factory name or address of the token exchange
   */
  readonly exchange?: string;
}

export interface GetPairPriceOperationRequestJSON {
  readonly chain?: EvmChainJSON;
  readonly to_block?: string;
  readonly to_date?: string;
  readonly token0_address: EvmAddressJSON;
  readonly token1_address: EvmAddressJSON;
  readonly exchange?: string;
}

export type GetPairPriceOperationResponse = EvmGetPairPrice;
export type GetPairPriceOperationResponseJSON = EvmGetPairPriceJSON;

export const GetPairPriceOperation = {
  operationId: "getPairPrice",
  groupName: "defi",
  httpMethod: "get",
  routePattern: "/{token0_address}/{token1_address}/price",
  parameterNames: ["chain","to_block","to_date","token0_address","token1_address","exchange"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmGetPairPriceJSON): EvmGetPairPrice {
    return EvmGetPairPrice.fromJSON(json);
  },

  serializeRequest(request: GetPairPriceOperationRequest): GetPairPriceOperationRequestJSON {
    const chain = request.chain ? EvmChain.create(request.chain) : undefined;
    const toBlock = request.toBlock;
    const toDate = request.toDate;
    const token0Address = EvmAddress.create(request.token0Address);
    const token1Address = EvmAddress.create(request.token1Address);
    const exchange = request.exchange;
    return {
      chain: chain ? chain.toJSON() : undefined,
      to_block: toBlock !== undefined ? String(toBlock) : undefined,
      to_date: toDate !== undefined ? toDate.toISOString() : undefined,
      token0_address: token0Address.toJSON(),
      token1_address: token1Address.toJSON(),
      exchange: exchange,
    };
  },

}

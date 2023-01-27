import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import {
  AptReservesCollection,
  AptReservesCollectionJSON,
  AptReservesCollectionInput,
} from '../types/AptReservesCollection';

export interface AptGetPairAddressOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly to_block?: string;
  readonly to_date?: string;
  readonly exchange: string;
  readonly token0_address: string;
  readonly token1_address: string;
}

export interface AptGetPairAddressOperationRequest {
  readonly chain?: AptChainListInput;
  readonly toBlock?: string;
  readonly toDate?: string;
  readonly exchange: string;
  readonly token0Address: string;
  readonly token1Address: string;
}

/**
 * @description Fetch the pair data of the provided token0+token1 combination.
 * The token0 and token1 options are interchangable (ie. there is no different outcome in "token0=WETH and token1=USDT" or "token0=USDT and token1=WETH")
 */
export const AptGetPairAddressOperation = {
  operationId: 'getPairAddress',
  httpMethod: 'get',
  routePattern: '/{token0_address}/{token1_address}/pairAddress',
  parameterNames: ['chain', 'to_block', 'to_date', 'exchange', 'token0_address', 'token1_address'],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptReservesCollectionJSON): AptReservesCollection {
    return AptReservesCollection.fromJSON(json);
  },

  serializeRequest(request: AptGetPairAddressOperationRequest): AptGetPairAddressOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const toBlock = request.toBlock;
    const toDate = request.toDate;
    const exchange = request.exchange;
    const token0Address = request.token0Address;
    const token1Address = request.token1Address;
    return {
      chain: chain ? chain.toJSON() : undefined,
      to_block: toBlock,
      to_date: toDate,
      exchange: exchange,
      token0_address: token0Address,
      token1_address: token1Address,
    };
  },
};

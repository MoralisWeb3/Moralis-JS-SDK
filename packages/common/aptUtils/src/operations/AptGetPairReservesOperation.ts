import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptGetPairReserves, AptGetPairReservesJSON, AptGetPairReservesInput } from '../types/AptGetPairReserves';

export interface AptGetPairReservesOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly to_block?: string;
  readonly to_date?: string;
  readonly pair_address: string;
}

export interface AptGetPairReservesOperationRequest {
  readonly chain?: AptChainListInput;
  readonly toBlock?: string;
  readonly toDate?: string;
  readonly pairAddress: string;
}

/**
 * @description Get the liquidity reserves for a given pair address. Only Uniswap V2 based exchanges supported at the moment.
 */
export const AptGetPairReservesOperation = {
  operationId: "getPairReserves",
  httpMethod: "get",
  routePattern: "/{pair_address}/reserves",
  parameterNames: ["chain","to_block","to_date","pair_address"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptGetPairReservesJSON): AptGetPairReserves {
    return AptGetPairReserves.fromJSON(json);
  },

  serializeRequest(request: AptGetPairReservesOperationRequest): AptGetPairReservesOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const toBlock = request.toBlock;
    const toDate = request.toDate;
    const pairAddress = request.pairAddress;
    return {
      chain: chain ? chain.toJSON() : undefined,
      to_block: toBlock,
      to_date: toDate,
      pair_address: pairAddress,
    };
  },

}

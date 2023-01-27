import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptErc20Price, AptErc20PriceJSON, AptErc20PriceInput } from '../types/AptErc20Price';

export interface AptGetTokenPriceOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly address: string;
  readonly exchange?: string;
  readonly to_block?: number;
}

export interface AptGetTokenPriceOperationRequest {
  readonly chain?: AptChainListInput;
  readonly address: string;
  readonly exchange?: string;
  readonly toBlock?: number;
}

/**
 * @description Get the token price denominated in the blockchain's native token and USD.
 */
export const AptGetTokenPriceOperation = {
  operationId: "getTokenPrice",
  httpMethod: "get",
  routePattern: "/erc20/{address}/price",
  parameterNames: ["chain","address","exchange","to_block"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptErc20PriceJSON): AptErc20Price {
    return AptErc20Price.fromJSON(json);
  },

  serializeRequest(request: AptGetTokenPriceOperationRequest): AptGetTokenPriceOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const address = request.address;
    const exchange = request.exchange;
    const toBlock = request.toBlock;
    return {
      chain: chain ? chain.toJSON() : undefined,
      address: address,
      exchange: exchange,
      to_block: toBlock,
    };
  },

}

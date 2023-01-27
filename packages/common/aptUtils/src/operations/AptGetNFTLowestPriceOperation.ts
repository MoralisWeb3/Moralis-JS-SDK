import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptTrade, AptTradeJSON, AptTradeInput } from '../types/AptTrade';

export interface AptGetNFTLowestPriceOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly days?: number;
  readonly marketplace?: string;
  readonly address: string;
}

export interface AptGetNFTLowestPriceOperationRequest {
  readonly chain?: AptChainListInput;
  readonly days?: number;
  readonly marketplace?: string;
  readonly address: string;
}

/**
 * @description Get the lowest executed price for an NFT contract for the last x days (only trades paid in ETH).
 */
export const AptGetNFTLowestPriceOperation = {
  operationId: "getNFTLowestPrice",
  httpMethod: "get",
  routePattern: "/nft/{address}/lowestprice",
  parameterNames: ["chain","days","marketplace","address"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptTradeJSON): AptTrade {
    return AptTrade.fromJSON(json);
  },

  serializeRequest(request: AptGetNFTLowestPriceOperationRequest): AptGetNFTLowestPriceOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const days = request.days;
    const marketplace = request.marketplace;
    const address = request.address;
    return {
      chain: chain ? chain.toJSON() : undefined,
      days: days,
      marketplace: marketplace,
      address: address,
    };
  },

}

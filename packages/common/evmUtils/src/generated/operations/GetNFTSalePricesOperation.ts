import { EvmChain, EvmChainInput, EvmChainJSON, EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { EvmSoldPrice, EvmSoldPriceJSON } from '../types/EvmSoldPrice';

// request parameters:
// - chain ($ref: #/components/schemas/nftTradesChainList)
// - days ($ref: #/paths/~1nft~1{address}~1{token_id}~1price/get/parameters/1/schema)
// - address ($ref: #/paths/~1nft~1{address}~1{token_id}~1price/get/parameters/2/schema)
// - token_id ($ref: #/paths/~1nft~1{address}~1{token_id}~1price/get/parameters/3/schema)

export interface GetNFTSalePricesOperationRequest {
  /**
   * @description The chain to query
   */
  readonly chain?: EvmChainInput | EvmChain;
  /**
   * @description The number of days to look back to find the lowest price
   * If not provided 7 days will be the default
   */
  readonly days?: number;
  /**
   * @description The address of the NFT collection
   */
  readonly address: EvmAddressInput | EvmAddress;
  /**
   * @description The token id of the NFT collection
   */
  readonly tokenId: string;
}

export interface GetNFTSalePricesOperationRequestJSON {
  readonly chain?: EvmChainJSON;
  readonly days?: number;
  readonly address: EvmAddressJSON;
  readonly token_id: string;
}

export type GetNFTSalePricesOperationResponse = EvmSoldPrice;
export type GetNFTSalePricesOperationResponseJSON = EvmSoldPriceJSON;

export const GetNFTSalePricesOperation = {
  operationId: "getNFTSalePrices",
  groupName: "nft",
  httpMethod: "get",
  routePattern: "/nft/{address}/{token_id}/price",
  parameterNames: ["chain","days","address","token_id"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmSoldPriceJSON): EvmSoldPrice {
    return EvmSoldPrice.fromJSON(json);
  },

  serializeRequest(request: GetNFTSalePricesOperationRequest): GetNFTSalePricesOperationRequestJSON {
    const chain = request.chain ? EvmChain.create(request.chain) : undefined;
    const days = request.days;
    const address = EvmAddress.create(request.address);
    const tokenId = request.tokenId;
    return {
      chain: chain ? chain.toJSON() : undefined,
      days: days,
      address: address.toJSON(),
      token_id: tokenId,
    };
  },

}

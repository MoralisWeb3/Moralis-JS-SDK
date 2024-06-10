import { EvmChain, EvmChainInput, EvmChainJSON, EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { EvmSoldPrice, EvmSoldPriceJSON } from '../types/EvmSoldPrice';

// request parameters:
// - chain ($ref: #/components/schemas/nftTradesChainList)
// - days ($ref: #/paths/~1nft~1{address}~1price/get/parameters/1/schema)
// - address ($ref: #/paths/~1nft~1{address}~1price/get/parameters/2/schema)

export interface GetNFTContractSalePricesOperationRequest {
  /**
   * @description The chain to query
   */
  readonly chain?: EvmChainInput | EvmChain;
  /**
   * @description The number of days to look back to find the lowest price
   * If not provided 7 days will be the default and 365 is the maximum
   */
  readonly days?: number;
  /**
   * @description The address of the NFT collection
   */
  readonly address: EvmAddressInput | EvmAddress;
}

export interface GetNFTContractSalePricesOperationRequestJSON {
  readonly chain?: EvmChainJSON;
  readonly days?: number;
  readonly address: EvmAddressJSON;
}

export type GetNFTContractSalePricesOperationResponse = EvmSoldPrice;
export type GetNFTContractSalePricesOperationResponseJSON = EvmSoldPriceJSON;

export const GetNFTContractSalePricesOperation = {
  operationId: "getNFTContractSalePrices",
  groupName: "nft",
  httpMethod: "get",
  routePattern: "/nft/{address}/price",
  parameterNames: ["chain","days","address"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmSoldPriceJSON): EvmSoldPrice {
    return EvmSoldPrice.fromJSON(json);
  },

  serializeRequest(request: GetNFTContractSalePricesOperationRequest): GetNFTContractSalePricesOperationRequestJSON {
    const chain = request.chain ? EvmChain.create(request.chain) : undefined;
    const days = request.days;
    const address = EvmAddress.create(request.address);
    return {
      chain: chain ? chain.toJSON() : undefined,
      days: days,
      address: address.toJSON(),
    };
  },

}

import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptNftOwnerCollection, AptNftOwnerCollectionJSON, AptNftOwnerCollectionInput } from '../types/AptNftOwnerCollection';

export interface AptGetWalletNFTsOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly address: string;
  readonly format?: string;
  readonly limit?: number;
  readonly disable_total?: boolean;
  readonly token_addresses?: string[];
  readonly cursor?: string;
  readonly normalizeMetadata?: boolean;
}

export interface AptGetWalletNFTsOperationRequest {
  readonly chain?: AptChainListInput;
  readonly address: string;
  readonly format?: string;
  readonly limit?: number;
  readonly disableTotal?: boolean;
  readonly tokenAddresses?: string[];
  readonly cursor?: string;
  readonly normalizeMetadata?: boolean;
}

/**
 * @description Get NFTs owned by a given address.
 * * The response will include status [SYNCED/SYNCING] based on the contracts being indexed.
 * * Use the token_address param to get results for a specific contract only
 * * Note that results will include all indexed NFTs
 * * Any request that includes the token_address param will start the indexing process for that NFT collection the very first time it is requested.
 */
export const AptGetWalletNFTsOperation = {
  operationId: "getWalletNFTs",
  httpMethod: "get",
  routePattern: "/{address}/nft",
  parameterNames: ["chain","address","format","limit","disable_total","token_addresses","cursor","normalizeMetadata"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptNftOwnerCollectionJSON): AptNftOwnerCollection {
    return AptNftOwnerCollection.fromJSON(json);
  },

  serializeRequest(request: AptGetWalletNFTsOperationRequest): AptGetWalletNFTsOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const address = request.address;
    const format = request.format;
    const limit = request.limit;
    const disableTotal = request.disableTotal;
    const tokenAddresses = request.tokenAddresses;
    const cursor = request.cursor;
    const normalizeMetadata = request.normalizeMetadata;
    return {
      chain: chain ? chain.toJSON() : undefined,
      address: address,
      format: format,
      limit: limit,
      disable_total: disableTotal,
      token_addresses: tokenAddresses,
      cursor: cursor,
      normalizeMetadata: normalizeMetadata,
    };
  },

}

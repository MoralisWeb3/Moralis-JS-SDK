import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import {
  AptNftWalletCollections,
  AptNftWalletCollectionsJSON,
  AptNftWalletCollectionsInput,
} from '../types/AptNftWalletCollections';

export interface AptGetWalletNFTCollectionsOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly address: string;
  readonly limit?: number;
  readonly disable_total?: boolean;
  readonly cursor?: string;
}

export interface AptGetWalletNFTCollectionsOperationRequest {
  readonly chain?: AptChainListInput;
  readonly address: string;
  readonly limit?: number;
  readonly disableTotal?: boolean;
  readonly cursor?: string;
}

/**
 * @description Get NFT collections owned by a given wallet address.
 */
export const AptGetWalletNFTCollectionsOperation = {
  operationId: 'getWalletNFTCollections',
  httpMethod: 'get',
  routePattern: '/{address}/nft/collections',
  parameterNames: ['chain', 'address', 'limit', 'disable_total', 'cursor'],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptNftWalletCollectionsJSON): AptNftWalletCollections {
    return AptNftWalletCollections.fromJSON(json);
  },

  serializeRequest(
    request: AptGetWalletNFTCollectionsOperationRequest,
  ): AptGetWalletNFTCollectionsOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const address = request.address;
    const limit = request.limit;
    const disableTotal = request.disableTotal;
    const cursor = request.cursor;
    return {
      chain: chain ? chain.toJSON() : undefined,
      address: address,
      limit: limit,
      disable_total: disableTotal,
      cursor: cursor,
    };
  },
};

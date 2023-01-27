import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptNft, AptNftJSON, AptNftInput } from '../types/AptNft';

export interface AptGetNFTMetadataOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly address: string;
  readonly token_id: string;
  readonly format?: string;
  readonly normalizeMetadata?: boolean;
}

export interface AptGetNFTMetadataOperationRequest {
  readonly chain?: AptChainListInput;
  readonly address: string;
  readonly tokenId: string;
  readonly format?: string;
  readonly normalizeMetadata?: boolean;
}

/**
 * @description Get NFT data, including metadata (where available), for the given NFT token ID and contract address.
 * * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
 */
export const AptGetNFTMetadataOperation = {
  operationId: 'getNFTMetadata',
  httpMethod: 'get',
  routePattern: '/nft/{address}/{token_id}',
  parameterNames: ['chain', 'address', 'token_id', 'format', 'normalizeMetadata'],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptNftJSON): AptNft {
    return AptNft.fromJSON(json);
  },

  serializeRequest(request: AptGetNFTMetadataOperationRequest): AptGetNFTMetadataOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const address = request.address;
    const tokenId = request.tokenId;
    const format = request.format;
    const normalizeMetadata = request.normalizeMetadata;
    return {
      chain: chain ? chain.toJSON() : undefined,
      address: address,
      token_id: tokenId,
      format: format,
      normalizeMetadata: normalizeMetadata,
    };
  },
};

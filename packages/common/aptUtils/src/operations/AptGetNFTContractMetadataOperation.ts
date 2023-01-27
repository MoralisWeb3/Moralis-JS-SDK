import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import {
  AptNftContractMetadata,
  AptNftContractMetadataJSON,
  AptNftContractMetadataInput,
} from '../types/AptNftContractMetadata';

export interface AptGetNFTContractMetadataOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly address: string;
}

export interface AptGetNFTContractMetadataOperationRequest {
  readonly chain?: AptChainListInput;
  readonly address: string;
}

/**
 * @description Get the collection / contract level metadata for a given contract (name, symbol, base token URI).
 * * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
 */
export const AptGetNFTContractMetadataOperation = {
  operationId: 'getNFTContractMetadata',
  httpMethod: 'get',
  routePattern: '/nft/{address}/metadata',
  parameterNames: ['chain', 'address'],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptNftContractMetadataJSON): AptNftContractMetadata {
    return AptNftContractMetadata.fromJSON(json);
  },

  serializeRequest(request: AptGetNFTContractMetadataOperationRequest): AptGetNFTContractMetadataOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const address = request.address;
    return {
      chain: chain ? chain.toJSON() : undefined,
      address: address,
    };
  },
};

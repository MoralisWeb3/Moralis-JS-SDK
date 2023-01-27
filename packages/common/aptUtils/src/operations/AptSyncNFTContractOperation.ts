import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';

export interface AptSyncNFTContractOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly address: string;
}

export interface AptSyncNFTContractOperationRequest {
  readonly chain?: AptChainListInput;
  readonly address: string;
}

/**
 * @description Initiates a sync of a previously non synced contract.
 */
export const AptSyncNFTContractOperation = {
  operationId: 'syncNFTContract',
  httpMethod: 'put',
  routePattern: '/nft/{address}/sync',
  parameterNames: ['chain', 'address'],
  hasResponse: false,
  hasBody: false,

  serializeRequest(request: AptSyncNFTContractOperationRequest): AptSyncNFTContractOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const address = request.address;
    return {
      chain: chain ? chain.toJSON() : undefined,
      address: address,
    };
  },
};

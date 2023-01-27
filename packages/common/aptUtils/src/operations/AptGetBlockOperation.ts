import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptBlock, AptBlockJSON, AptBlockInput } from '../types/AptBlock';

export interface AptGetBlockOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly block_number_or_hash: string;
}

export interface AptGetBlockOperationRequest {
  readonly chain?: AptChainListInput;
  readonly blockNumberOrHash: string;
}

/**
 * @description Get the contents of a block given the block hash.
 */
export const AptGetBlockOperation = {
  operationId: 'getBlock',
  httpMethod: 'get',
  routePattern: '/block/{block_number_or_hash}',
  parameterNames: ['chain', 'block_number_or_hash'],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptBlockJSON): AptBlock {
    return AptBlock.fromJSON(json);
  },

  serializeRequest(request: AptGetBlockOperationRequest): AptGetBlockOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const blockNumberOrHash = request.blockNumberOrHash;
    return {
      chain: chain ? chain.toJSON() : undefined,
      block_number_or_hash: blockNumberOrHash,
    };
  },
};

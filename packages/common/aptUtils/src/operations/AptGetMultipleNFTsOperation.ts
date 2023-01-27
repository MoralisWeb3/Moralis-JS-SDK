import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptNftOwner, AptNftOwnerJSON, AptNftOwnerInput } from '../types/AptNftOwner';
import {
  AptGetMultipleNftsDto,
  AptGetMultipleNftsDtoJSON,
  AptGetMultipleNftsDtoInput,
} from '../types/AptGetMultipleNftsDto';

export interface AptGetMultipleNFTsOperationRequestJSON {
  readonly chain?: AptChainListJSON;
}

export interface AptGetMultipleNFTsOperationRequest {
  readonly chain?: AptChainListInput;
  readonly body: AptGetMultipleNftsDtoInput;
}

/**
 * @description Returns an array of NFTs specified in the request.
 * * Note that results will include all indexed NFTs
 * * Any request that includes the token_address param will start the indexing process for that NFT collection the very first time it is requested.
 * * Only 25 NFTs can be fetched in one API call.
 */
export const AptGetMultipleNFTsOperation = {
  operationId: 'getMultipleNFTs',
  httpMethod: 'post',
  routePattern: '/nft/getMultipleNFTs',
  parameterNames: ['chain'],
  hasResponse: true,
  hasBody: true,

  parseResponse(json: AptNftOwnerJSON[]): AptNftOwner[] {
    return json.map((item) => AptNftOwner.fromJSON(item));
  },

  serializeRequest(request: AptGetMultipleNFTsOperationRequest): AptGetMultipleNFTsOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    return {
      chain: chain ? chain.toJSON() : undefined,
    };
  },

  serializeBody(request: AptGetMultipleNFTsOperationRequest): AptGetMultipleNftsDtoJSON {
    const body = AptGetMultipleNftsDto.create(request.body);
    return body.toJSON();
  },
};

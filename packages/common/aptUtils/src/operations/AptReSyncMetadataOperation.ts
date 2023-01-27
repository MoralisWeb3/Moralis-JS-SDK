import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptMetadataResync, AptMetadataResyncJSON, AptMetadataResyncInput } from '../types/AptMetadataResync';

export interface AptReSyncMetadataOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly address: string;
  readonly token_id: string;
  readonly flag?: string;
  readonly mode?: string;
}

export interface AptReSyncMetadataOperationRequest {
  readonly chain?: AptChainListInput;
  readonly address: string;
  readonly tokenId: string;
  readonly flag?: string;
  readonly mode?: string;
}

/**
 * @description Resync the metadata for an NFT
 * * The metadata flag will request the NFT's metadata from an already existing token_uri
 * * The uri (default) flag will fetch the latest token_uri from the given NFT contract address. In sync mode the metadata will also be fetched
 * * The sync mode will make the endpoint synchronous so it will wait for the task to be completed before responding
 * * The async mode (default) will make the endpoint asynchronous so we will wait for the task to be completed before responding
 */
export const AptReSyncMetadataOperation = {
  operationId: "reSyncMetadata",
  httpMethod: "get",
  routePattern: "/nft/{address}/{token_id}/metadata/resync",
  parameterNames: ["chain","address","token_id","flag","mode"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptMetadataResyncJSON): AptMetadataResync {
    return AptMetadataResync.fromJSON(json);
  },

  serializeRequest(request: AptReSyncMetadataOperationRequest): AptReSyncMetadataOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const address = request.address;
    const tokenId = request.tokenId;
    const flag = request.flag;
    const mode = request.mode;
    return {
      chain: chain ? chain.toJSON() : undefined,
      address: address,
      token_id: tokenId,
      flag: flag,
      mode: mode,
    };
  },

}

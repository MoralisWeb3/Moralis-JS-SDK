import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptNftTransferCollection, AptNftTransferCollectionJSON, AptNftTransferCollectionInput } from '../types/AptNftTransferCollection';

export interface AptGetWalletNFTTransfersOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly address: string;
  readonly format?: string;
  readonly direction?: string;
  readonly from_block?: number;
  readonly to_block?: string;
  readonly limit?: number;
  readonly disable_total?: boolean;
  readonly cursor?: string;
}

export interface AptGetWalletNFTTransfersOperationRequest {
  readonly chain?: AptChainListInput;
  readonly address: string;
  readonly format?: string;
  readonly direction?: string;
  readonly fromBlock?: number;
  readonly toBlock?: string;
  readonly limit?: number;
  readonly disableTotal?: boolean;
  readonly cursor?: string;
}

/**
 * @description Get transfers of NFTs given the wallet and other parameters.
 */
export const AptGetWalletNFTTransfersOperation = {
  operationId: "getWalletNFTTransfers",
  httpMethod: "get",
  routePattern: "/{address}/nft/transfers",
  parameterNames: ["chain","address","format","direction","from_block","to_block","limit","disable_total","cursor"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptNftTransferCollectionJSON): AptNftTransferCollection {
    return AptNftTransferCollection.fromJSON(json);
  },

  serializeRequest(request: AptGetWalletNFTTransfersOperationRequest): AptGetWalletNFTTransfersOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const address = request.address;
    const format = request.format;
    const direction = request.direction;
    const fromBlock = request.fromBlock;
    const toBlock = request.toBlock;
    const limit = request.limit;
    const disableTotal = request.disableTotal;
    const cursor = request.cursor;
    return {
      chain: chain ? chain.toJSON() : undefined,
      address: address,
      format: format,
      direction: direction,
      from_block: fromBlock,
      to_block: toBlock,
      limit: limit,
      disable_total: disableTotal,
      cursor: cursor,
    };
  },

}

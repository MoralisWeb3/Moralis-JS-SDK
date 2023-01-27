import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptErc20TransactionCollection, AptErc20TransactionCollectionJSON, AptErc20TransactionCollectionInput } from '../types/AptErc20TransactionCollection';

export interface AptGetWalletTokenTransfersOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly from_block?: number;
  readonly to_block?: number;
  readonly from_date?: string;
  readonly to_date?: string;
  readonly address: string;
  readonly limit?: number;
  readonly disable_total?: boolean;
  readonly cursor?: string;
}

export interface AptGetWalletTokenTransfersOperationRequest {
  readonly chain?: AptChainListInput;
  readonly fromBlock?: number;
  readonly toBlock?: number;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly address: string;
  readonly limit?: number;
  readonly disableTotal?: boolean;
  readonly cursor?: string;
}

/**
 * @description Get ERC20 token transactions ordered by block number in descending order.
 */
export const AptGetWalletTokenTransfersOperation = {
  operationId: "getWalletTokenTransfers",
  httpMethod: "get",
  routePattern: "/{address}/erc20/transfers",
  parameterNames: ["chain","from_block","to_block","from_date","to_date","address","limit","disable_total","cursor"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptErc20TransactionCollectionJSON): AptErc20TransactionCollection {
    return AptErc20TransactionCollection.fromJSON(json);
  },

  serializeRequest(request: AptGetWalletTokenTransfersOperationRequest): AptGetWalletTokenTransfersOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const fromBlock = request.fromBlock;
    const toBlock = request.toBlock;
    const fromDate = request.fromDate;
    const toDate = request.toDate;
    const address = request.address;
    const limit = request.limit;
    const disableTotal = request.disableTotal;
    const cursor = request.cursor;
    return {
      chain: chain ? chain.toJSON() : undefined,
      from_block: fromBlock,
      to_block: toBlock,
      from_date: fromDate,
      to_date: toDate,
      address: address,
      limit: limit,
      disable_total: disableTotal,
      cursor: cursor,
    };
  },

}

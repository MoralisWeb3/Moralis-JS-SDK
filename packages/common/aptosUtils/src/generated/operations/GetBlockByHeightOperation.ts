import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosBlock, AptosBlockJSON } from '../types/AptosBlock';

// request parameters:
// - block_height ($ref: #/paths/~1blocks~1{block_height}/get/parameters/0/schema)
// - with_transactions ($ref: #/paths/~1blocks~1{block_height}/get/parameters/1/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetBlockByHeightOperationRequest {
  /**
   * @description Block height to lookup. Starts at 0
   */
  readonly blockHeight: number;
  /**
   * @description If set to true, include all transactions in the block
   */
  readonly withTransactions?: boolean;
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetBlockByHeightOperationRequestJSON {
  readonly block_height: number;
  readonly with_transactions?: boolean;
  readonly network?: AptosNetworkJSON;
}

export const GetBlockByHeightOperation = {
  operationId: "getBlockByHeight",
  groupName: "blocks",
  httpMethod: "get",
  routePattern: "/blocks/{block_height}",
  parameterNames: ["block_height","with_transactions","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosBlockJSON): AptosBlock {
    return AptosBlock.fromJSON(json);
  },

  serializeRequest(request: GetBlockByHeightOperationRequest): GetBlockByHeightOperationRequestJSON {
    const blockHeight = request.blockHeight;
    const withTransactions = request.withTransactions;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      block_height: blockHeight,
      with_transactions: withTransactions,
      network: network ? network.toJSON() : undefined,
    };
  },

}

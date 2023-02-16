import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosBlock, AptosBlockJSON } from '../types/AptosBlock';

// request parameters:
// - version ($ref: #/paths/~1blocks~1by_version~1{version}/get/parameters/0/schema)
// - with_transactions ($ref: #/paths/~1blocks~1by_version~1{version}/get/parameters/1/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetBlockByVersionOperationRequest {
  /**
   * @description Ledger version to lookup block information for.
   */
  readonly version: number;
  /**
   * @description If set to true, include all transactions in the block
   */
  readonly withTransactions?: boolean;
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetBlockByVersionOperationRequestJSON {
  readonly version: number;
  readonly with_transactions?: boolean;
  readonly network?: AptosNetworkJSON;
}

export const GetBlockByVersionOperation = {
  operationId: "getBlockByVersion",
  groupName: "blocks",
  httpMethod: "get",
  routePattern: "/blocks/by_version/{version}",
  parameterNames: ["version","with_transactions","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosBlockJSON): AptosBlock {
    return AptosBlock.fromJSON(json);
  },

  serializeRequest(request: GetBlockByVersionOperationRequest): GetBlockByVersionOperationRequestJSON {
    const version = request.version;
    const withTransactions = request.withTransactions;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      version: version,
      with_transactions: withTransactions,
      network: network ? network.toJSON() : undefined,
    };
  },

}

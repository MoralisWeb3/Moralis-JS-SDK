import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosNFTCollectionItemResponse, AptosNFTCollectionItemResponseJSON } from '../types/AptosNFTCollectionItemResponse';

// request parameters:
// - ids ($ref: #/paths/~1collections~1ids/get/parameters/0/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetNFTCollectionsByIdsOperationRequest {
  /**
   * @description The identifiers of the collections to get
   */
  readonly ids: string[];
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetNFTCollectionsByIdsOperationRequestJSON {
  readonly ids: string[];
  readonly network?: AptosNetworkJSON;
}

export const GetNFTCollectionsByIdsOperation = {
  operationId: "getNFTCollectionsByIds",
  groupName: "collections",
  httpMethod: "get",
  routePattern: "/collections/ids",
  parameterNames: ["ids","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosNFTCollectionItemResponseJSON[]): AptosNFTCollectionItemResponse[] {
    return json.map((item) => AptosNFTCollectionItemResponse.fromJSON(item));
  },

  serializeRequest(request: GetNFTCollectionsByIdsOperationRequest): GetNFTCollectionsByIdsOperationRequestJSON {
    const ids = request.ids;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      ids: ids,
      network: network ? network.toJSON() : undefined,
    };
  },

}

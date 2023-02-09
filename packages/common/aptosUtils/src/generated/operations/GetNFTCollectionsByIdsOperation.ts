import { AptosNFTCollectionItemResponse, AptosNFTCollectionItemResponseJSON } from '../types/AptosNFTCollectionItemResponse';

// request parameters:
// - ids ($ref: #/paths/~1collections~1ids/get/parameters/0/schema)

export interface GetNFTCollectionsByIdsOperationRequest {
  readonly ids: string[];
}

export interface GetNFTCollectionsByIdsOperationRequestJSON {
  readonly ids: string[];
}

export const GetNFTCollectionsByIdsOperation = {
  operationId: "getNFTCollectionsByIds",
  groupName: "collections",
  httpMethod: "get",
  routePattern: "/collections/ids",
  parameterNames: ["ids"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosNFTCollectionItemResponseJSON[]): AptosNFTCollectionItemResponse[] {
    return json.map((item) => AptosNFTCollectionItemResponse.fromJSON(item));
  },

  serializeRequest(request: GetNFTCollectionsByIdsOperationRequest): GetNFTCollectionsByIdsOperationRequestJSON {
    const ids = request.ids;
    return {
      ids: ids,
    };
  },

}

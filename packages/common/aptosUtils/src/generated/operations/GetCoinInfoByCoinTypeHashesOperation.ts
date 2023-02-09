import { AptosCoinInfoDto, AptosCoinInfoDtoJSON } from '../types/AptosCoinInfoDto';

// request parameters:
// - coin_type_hashes ($ref: #/paths/~1coins/get/parameters/0/schema)

export interface GetCoinInfoByCoinTypeHashesOperationRequest {
  readonly coinTypeHashes: string[];
}

export interface GetCoinInfoByCoinTypeHashesOperationRequestJSON {
  readonly coin_type_hashes: string[];
}

export const GetCoinInfoByCoinTypeHashesOperation = {
  operationId: "getCoinInfoByCoinTypeHashes",
  groupName: "coins",
  httpMethod: "get",
  routePattern: "/coins",
  parameterNames: ["coin_type_hashes"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosCoinInfoDtoJSON[]): AptosCoinInfoDto[] {
    return json.map((item) => AptosCoinInfoDto.fromJSON(item));
  },

  serializeRequest(request: GetCoinInfoByCoinTypeHashesOperationRequest): GetCoinInfoByCoinTypeHashesOperationRequestJSON {
    const coinTypeHashes = request.coinTypeHashes;
    return {
      coin_type_hashes: coinTypeHashes,
    };
  },

}

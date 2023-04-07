import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosCoinInfoDto, AptosCoinInfoDtoJSON } from '../types/AptosCoinInfoDto';

// request parameters:
// - coin_type_hashes ($ref: #/paths/~1coins/get/parameters/0/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetCoinInfoByCoinTypeHashesOperationRequest {
  /**
   * @description The coin type hashes to fetch info about
   */
  readonly coinTypeHashes: string[];
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetCoinInfoByCoinTypeHashesOperationRequestJSON {
  readonly coin_type_hashes: string[];
  readonly network?: AptosNetworkJSON;
}

export const GetCoinInfoByCoinTypeHashesOperation = {
  operationId: "getCoinInfoByCoinTypeHashes",
  groupName: "coins",
  httpMethod: "get",
  routePattern: "/coins",
  parameterNames: ["coinTypeHashes","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosCoinInfoDtoJSON[]): AptosCoinInfoDto[] {
    return json.map((item) => AptosCoinInfoDto.fromJSON(item));
  },

  serializeRequest(request: GetCoinInfoByCoinTypeHashesOperationRequest): GetCoinInfoByCoinTypeHashesOperationRequestJSON {
    const coinTypeHashes = request.coinTypeHashes;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      coin_type_hashes: coinTypeHashes,
      network: network ? network.toJSON() : undefined,
    };
  },

}

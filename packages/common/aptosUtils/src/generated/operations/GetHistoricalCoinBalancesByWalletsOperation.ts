import { AptosAddress, AptosAddressInput, AptosAddressJSON } from '../../dataTypes';
import { AptosGetHistoricalCoinBalancesByWalletsResponse, AptosGetHistoricalCoinBalancesByWalletsResponseJSON } from '../types/AptosGetHistoricalCoinBalancesByWalletsResponse';

// request parameters:
// - limit ($ref: #/paths/~1wallets~1coins~1history/get/parameters/0/schema)
// - offset ($ref: #/paths/~1wallets~1coins~1history/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1wallets~1coins~1history/get/parameters/2/schema)
// - owner_addresses ($ref: #/paths/~1wallets~1coins~1history/get/parameters/3/schema)
// - coin_type_hash_blacklist ($ref: #/paths/~1wallets~1coins~1history/get/parameters/4/schema)
// - coin_type_hash_whitelist ($ref: #/paths/~1wallets~1coins~1history/get/parameters/5/schema)

export interface GetHistoricalCoinBalancesByWalletsOperationRequest {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly ownerAddresses: AptosAddressInput[] | AptosAddress[];
  readonly coinTypeHashBlacklist?: string[];
  readonly coinTypeHashWhitelist?: string[];
}

export interface GetHistoricalCoinBalancesByWalletsOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly owner_addresses: AptosAddressJSON[];
  readonly coin_type_hash_blacklist?: string[];
  readonly coin_type_hash_whitelist?: string[];
}

export const GetHistoricalCoinBalancesByWalletsOperation = {
  operationId: "getHistoricalCoinBalancesByWallets",
  groupName: "wallets",
  httpMethod: "get",
  routePattern: "/wallets/coins/history",
  parameterNames: ["limit","offset","cursor","owner_addresses","coin_type_hash_blacklist","coin_type_hash_whitelist"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetHistoricalCoinBalancesByWalletsResponseJSON): AptosGetHistoricalCoinBalancesByWalletsResponse {
    return AptosGetHistoricalCoinBalancesByWalletsResponse.fromJSON(json);
  },

  serializeRequest(request: GetHistoricalCoinBalancesByWalletsOperationRequest): GetHistoricalCoinBalancesByWalletsOperationRequestJSON {
    const limit = request.limit;
    const offset = request.offset;
    const cursor = request.cursor;
    const ownerAddresses = request.ownerAddresses.map((item) => AptosAddress.create(item));
    const coinTypeHashBlacklist = request.coinTypeHashBlacklist;
    const coinTypeHashWhitelist = request.coinTypeHashWhitelist;
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      owner_addresses: ownerAddresses.map((item) => item.toJSON()),
      coin_type_hash_blacklist: coinTypeHashBlacklist,
      coin_type_hash_whitelist: coinTypeHashWhitelist,
    };
  },

}

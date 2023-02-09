import { AptosAddress, AptosAddressInput, AptosAddressJSON } from '../../dataTypes';
import { AptosGetCoinBalancesByWalletsResponse, AptosGetCoinBalancesByWalletsResponseJSON } from '../types/AptosGetCoinBalancesByWalletsResponse';

// request parameters:
// - limit ($ref: #/paths/~1wallets~1coins/get/parameters/0/schema)
// - offset ($ref: #/paths/~1wallets~1coins/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1wallets~1coins/get/parameters/2/schema)
// - owner_addresses ($ref: #/paths/~1wallets~1coins/get/parameters/3/schema)
// - coin_type_hash_blacklist ($ref: #/paths/~1wallets~1coins/get/parameters/4/schema)
// - coin_type_hash_whitelist ($ref: #/paths/~1wallets~1coins/get/parameters/5/schema)

export interface GetCoinBalancesByWalletsOperationRequest {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly ownerAddresses: AptosAddressInput[] | AptosAddress[];
  readonly coinTypeHashBlacklist?: string[];
  readonly coinTypeHashWhitelist?: string[];
}

export interface GetCoinBalancesByWalletsOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly owner_addresses: AptosAddressJSON[];
  readonly coin_type_hash_blacklist?: string[];
  readonly coin_type_hash_whitelist?: string[];
}

export const GetCoinBalancesByWalletsOperation = {
  operationId: "getCoinBalancesByWallets",
  groupName: "wallets",
  httpMethod: "get",
  routePattern: "/wallets/coins",
  parameterNames: ["limit","offset","cursor","owner_addresses","coin_type_hash_blacklist","coin_type_hash_whitelist"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetCoinBalancesByWalletsResponseJSON): AptosGetCoinBalancesByWalletsResponse {
    return AptosGetCoinBalancesByWalletsResponse.fromJSON(json);
  },

  serializeRequest(request: GetCoinBalancesByWalletsOperationRequest): GetCoinBalancesByWalletsOperationRequestJSON {
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

import { AptosAddress, AptosAddressInput, AptosAddressJSON, AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosGetCoinTransfersByOwnerAddressesResponse, AptosGetCoinTransfersByOwnerAddressesResponseJSON } from '../types/AptosGetCoinTransfersByOwnerAddressesResponse';

// request parameters:
// - limit ($ref: #/paths/~1wallets~1coins~1transfers/get/parameters/0/schema)
// - offset ($ref: #/paths/~1wallets~1coins~1transfers/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1wallets~1coins~1transfers/get/parameters/2/schema)
// - owner_addresses ($ref: #/paths/~1wallets~1coins~1transfers/get/parameters/3/schema)
// - from_date ($ref: #/paths/~1wallets~1coins~1transfers/get/parameters/4/schema)
// - to_date ($ref: #/paths/~1wallets~1coins~1transfers/get/parameters/5/schema)
// - coin_type_blacklist ($ref: #/paths/~1wallets~1coins~1transfers/get/parameters/6/schema)
// - coin_type_whitelist ($ref: #/paths/~1wallets~1coins~1transfers/get/parameters/7/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetCoinTransfersByWalletAddressesOperationRequest {
  /**
   * @description The number of results to return
   */
  readonly limit: number;
  /**
   * @description The number of results to skip
   */
  readonly offset?: number;
  /**
   * @description The cursor to use for getting the next page
   */
  readonly cursor?: string;
  /**
   * @description The addresses of the owners to get tokens for
   */
  readonly ownerAddresses: AptosAddressInput[] | AptosAddress[];
  /**
   * @description The date from which to fetch coin transfers
   */
  readonly fromDate?: string;
  /**
   * @description The date to which to fetch coin transfers
   */
  readonly toDate?: string;
  /**
   * @description The coin types of the coins to whitelist
   */
  readonly coinTypeBlacklist?: string[];
  /**
   * @description The coin types of the coins to whitelist
   */
  readonly coinTypeWhitelist?: string[];
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetCoinTransfersByWalletAddressesOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly owner_addresses: AptosAddressJSON[];
  readonly from_date?: string;
  readonly to_date?: string;
  readonly coin_type_blacklist?: string[];
  readonly coin_type_whitelist?: string[];
  readonly network?: AptosNetworkJSON;
}

export const GetCoinTransfersByWalletAddressesOperation = {
  operationId: "getCoinTransfersByWalletAddresses",
  groupName: "wallets",
  httpMethod: "get",
  routePattern: "/wallets/coins/transfers",
  parameterNames: ["limit","offset","cursor","owner_addresses","from_date","to_date","coin_type_blacklist","coin_type_whitelist","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetCoinTransfersByOwnerAddressesResponseJSON): AptosGetCoinTransfersByOwnerAddressesResponse {
    return AptosGetCoinTransfersByOwnerAddressesResponse.fromJSON(json);
  },

  serializeRequest(request: GetCoinTransfersByWalletAddressesOperationRequest): GetCoinTransfersByWalletAddressesOperationRequestJSON {
    const limit = request.limit;
    const offset = request.offset;
    const cursor = request.cursor;
    const ownerAddresses = request.ownerAddresses.map((item) => AptosAddress.create(item));
    const fromDate = request.fromDate;
    const toDate = request.toDate;
    const coinTypeBlacklist = request.coinTypeBlacklist;
    const coinTypeWhitelist = request.coinTypeWhitelist;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      owner_addresses: ownerAddresses.map((item) => item.toJSON()),
      from_date: fromDate,
      to_date: toDate,
      coin_type_blacklist: coinTypeBlacklist,
      coin_type_whitelist: coinTypeWhitelist,
      network: network ? network.toJSON() : undefined,
    };
  },

}

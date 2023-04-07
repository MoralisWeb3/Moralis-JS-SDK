import { AptosNative, AptosNativeInput, AptosNativeJSON, AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosGetTopHoldersByCoinResponse, AptosGetTopHoldersByCoinResponseJSON } from '../types/AptosGetTopHoldersByCoinResponse';

// request parameters:
// - coin_type_hash ($ref: #/paths/~1coins~1owners~1{coin_type_hash}~1top-holders/get/parameters/0/schema)
// - limit ($ref: #/paths/~1coins~1owners~1{coin_type_hash}~1top-holders/get/parameters/1/schema)
// - offset ($ref: #/paths/~1coins~1owners~1{coin_type_hash}~1top-holders/get/parameters/2/schema)
// - cursor ($ref: #/paths/~1coins~1owners~1{coin_type_hash}~1top-holders/get/parameters/3/schema)
// - min_amount ($ref: #/paths/~1coins~1owners~1{coin_type_hash}~1top-holders/get/parameters/4/schema)
// - min_version ($ref: #/paths/~1coins~1owners~1{coin_type_hash}~1top-holders/get/parameters/5/schema)
// - wallet_blacklist ($ref: #/paths/~1coins~1owners~1{coin_type_hash}~1top-holders/get/parameters/6/schema)
// - wallet_whitelist ($ref: #/paths/~1coins~1owners~1{coin_type_hash}~1top-holders/get/parameters/7/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetTopHoldersByCoinOperationRequest {
  /**
   * @description The coin type hash to fetch info about
   */
  readonly coinTypeHash: string;
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
   * @description The minimum amount of coins required for a wallet to be included in the results
   */
  readonly minAmount?: AptosNativeInput | AptosNative;
  /**
   * @description The minimum version on when the balance was last updated
   */
  readonly minVersion?: number;
  /**
   * @description The addresses of the wallets to blacklist
   */
  readonly walletBlacklist?: string[];
  /**
   * @description The addresses of the wallets to whitelist
   */
  readonly walletWhitelist?: string[];
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetTopHoldersByCoinOperationRequestJSON {
  readonly coin_type_hash: string;
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly min_amount?: AptosNativeJSON;
  readonly min_version?: number;
  readonly wallet_blacklist?: string[];
  readonly wallet_whitelist?: string[];
  readonly network?: AptosNetworkJSON;
}

export const GetTopHoldersByCoinOperation = {
  operationId: "getTopHoldersByCoin",
  groupName: "coins",
  httpMethod: "get",
  routePattern: "/coins/owners/{coin_type_hash}/top-holders",
  parameterNames: ["coinTypeHash","limit","offset","cursor","minAmount","minVersion","walletBlacklist","walletWhitelist","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetTopHoldersByCoinResponseJSON): AptosGetTopHoldersByCoinResponse {
    return AptosGetTopHoldersByCoinResponse.fromJSON(json);
  },

  serializeRequest(request: GetTopHoldersByCoinOperationRequest): GetTopHoldersByCoinOperationRequestJSON {
    const coinTypeHash = request.coinTypeHash;
    const limit = request.limit;
    const offset = request.offset;
    const cursor = request.cursor;
    const minAmount = request.minAmount ? AptosNative.create(request.minAmount) : undefined;
    const minVersion = request.minVersion;
    const walletBlacklist = request.walletBlacklist;
    const walletWhitelist = request.walletWhitelist;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      coin_type_hash: coinTypeHash,
      limit: limit,
      offset: offset,
      cursor: cursor,
      min_amount: minAmount ? minAmount.toJSON() : undefined,
      min_version: minVersion,
      wallet_blacklist: walletBlacklist,
      wallet_whitelist: walletWhitelist,
      network: network ? network.toJSON() : undefined,
    };
  },

}

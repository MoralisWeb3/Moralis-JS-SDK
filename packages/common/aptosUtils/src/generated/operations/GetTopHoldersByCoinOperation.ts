import { AptosNative, AptosNativeInput, AptosNativeJSON } from '../../dataTypes';
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

export interface GetTopHoldersByCoinOperationRequest {
  readonly coinTypeHash: string;
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly minAmount?: AptosNativeInput | AptosNative;
  readonly minVersion?: number;
  readonly walletBlacklist?: string[];
  readonly walletWhitelist?: string[];
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
}

export const GetTopHoldersByCoinOperation = {
  operationId: "getTopHoldersByCoin",
  groupName: "coins",
  httpMethod: "get",
  routePattern: "/coins/owners/{coin_type_hash}/top-holders",
  parameterNames: ["coin_type_hash","limit","offset","cursor","min_amount","min_version","wallet_blacklist","wallet_whitelist"],
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
    return {
      coin_type_hash: coinTypeHash,
      limit: limit,
      offset: offset,
      cursor: cursor,
      min_amount: minAmount ? minAmount.toJSON() : undefined,
      min_version: minVersion,
      wallet_blacklist: walletBlacklist,
      wallet_whitelist: walletWhitelist,
    };
  },

}

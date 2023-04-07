import { AptosAddress, AptosAddressInput, AptosAddressJSON, AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosNFTTransfersByWalletsResponse, AptosNFTTransfersByWalletsResponseJSON } from '../types/AptosNFTTransfersByWalletsResponse';

// request parameters:
// - limit ($ref: #/paths/~1wallets~1nfts~1transfers/get/parameters/0/schema)
// - offset ($ref: #/paths/~1wallets~1nfts~1transfers/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1wallets~1nfts~1transfers/get/parameters/2/schema)
// - wallet_addresses ($ref: #/paths/~1wallets~1nfts~1transfers/get/parameters/3/schema)
// - collection_blacklist ($ref: #/paths/~1wallets~1nfts~1transfers/get/parameters/4/schema)
// - collection_whitelist ($ref: #/paths/~1wallets~1nfts~1transfers/get/parameters/5/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetWalletsNFTTransfersOperationRequest {
  /**
   * @description The number of tokens to return
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
   * @description The addresses of the wallets to get transfers for
   */
  readonly walletAddresses: AptosAddressInput[] | AptosAddress[];
  /**
   * @description The ids of the collections to whitelist
   */
  readonly collectionBlacklist?: string[];
  /**
   * @description The ids of the collections to whitelist
   */
  readonly collectionWhitelist?: string[];
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetWalletsNFTTransfersOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly wallet_addresses: AptosAddressJSON[];
  readonly collection_blacklist?: string[];
  readonly collection_whitelist?: string[];
  readonly network?: AptosNetworkJSON;
}

export const GetWalletsNFTTransfersOperation = {
  operationId: "getWalletsNFTTransfers",
  groupName: "wallets",
  httpMethod: "get",
  routePattern: "/wallets/nfts/transfers",
  parameterNames: ["limit","offset","cursor","wallet_addresses","collection_blacklist","collection_whitelist","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosNFTTransfersByWalletsResponseJSON): AptosNFTTransfersByWalletsResponse {
    return AptosNFTTransfersByWalletsResponse.fromJSON(json);
  },

  serializeRequest(request: GetWalletsNFTTransfersOperationRequest): GetWalletsNFTTransfersOperationRequestJSON {
    const limit = request.limit;
    const offset = request.offset;
    const cursor = request.cursor;
    const walletAddresses = request.walletAddresses.map((item) => AptosAddress.create(item));
    const collectionBlacklist = request.collectionBlacklist;
    const collectionWhitelist = request.collectionWhitelist;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      wallet_addresses: walletAddresses.map((item) => item.toJSON()),
      collection_blacklist: collectionBlacklist,
      collection_whitelist: collectionWhitelist,
      network: network ? network.toJSON() : undefined,
    };
  },

}

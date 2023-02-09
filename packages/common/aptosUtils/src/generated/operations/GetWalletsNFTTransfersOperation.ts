import { AptosAddress, AptosAddressInput, AptosAddressJSON } from '../../dataTypes';
import { AptosNFTTransfersByWalletsResponse, AptosNFTTransfersByWalletsResponseJSON } from '../types/AptosNFTTransfersByWalletsResponse';

// request parameters:
// - limit ($ref: #/paths/~1wallets~1nfts~1transfers/get/parameters/0/schema)
// - offset ($ref: #/paths/~1wallets~1nfts~1transfers/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1wallets~1nfts~1transfers/get/parameters/2/schema)
// - wallet_addresses ($ref: #/paths/~1wallets~1nfts~1transfers/get/parameters/3/schema)
// - collection_blacklist ($ref: #/paths/~1wallets~1nfts~1transfers/get/parameters/4/schema)
// - collection_whitelist ($ref: #/paths/~1wallets~1nfts~1transfers/get/parameters/5/schema)

export interface GetWalletsNFTTransfersOperationRequest {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly walletAddresses: AptosAddressInput[] | AptosAddress[];
  readonly collectionBlacklist?: string[];
  readonly collectionWhitelist?: string[];
}

export interface GetWalletsNFTTransfersOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly wallet_addresses: AptosAddressJSON[];
  readonly collection_blacklist?: string[];
  readonly collection_whitelist?: string[];
}

export const GetWalletsNFTTransfersOperation = {
  operationId: "getWalletsNFTTransfers",
  groupName: "wallets",
  httpMethod: "get",
  routePattern: "/wallets/nfts/transfers",
  parameterNames: ["limit","offset","cursor","wallet_addresses","collection_blacklist","collection_whitelist"],
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
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      wallet_addresses: walletAddresses.map((item) => item.toJSON()),
      collection_blacklist: collectionBlacklist,
      collection_whitelist: collectionWhitelist,
    };
  },

}

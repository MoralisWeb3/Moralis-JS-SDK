import { EvmChain, EvmChainInput, EvmChainJSON, EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { EvmWalletStat, EvmWalletStatJSON } from '../types/EvmWalletStat';

// request parameters:
// - chain ($ref: #/components/schemas/chainList)
// - address ($ref: #/paths/~1wallets~1{address}~1stats/get/parameters/1/schema)

export interface GetWalletStatsOperationRequest {
  /**
   * @description The chain to query
   */
  readonly chain?: EvmChainInput | EvmChain;
  /**
   * @description Wallet address
   */
  readonly address: EvmAddressInput | EvmAddress;
}

export interface GetWalletStatsOperationRequestJSON {
  readonly chain?: EvmChainJSON;
  readonly address: EvmAddressJSON;
}

export type GetWalletStatsOperationResponse = EvmWalletStat;
export type GetWalletStatsOperationResponseJSON = EvmWalletStatJSON;

export const GetWalletStatsOperation = {
  operationId: "getWalletStats",
  groupName: "wallets",
  httpMethod: "get",
  routePattern: "/wallets/{address}/stats",
  parameterNames: ["chain","address"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmWalletStatJSON): EvmWalletStat {
    return EvmWalletStat.fromJSON(json);
  },

  serializeRequest(request: GetWalletStatsOperationRequest): GetWalletStatsOperationRequestJSON {
    const chain = request.chain ? EvmChain.create(request.chain) : undefined;
    const address = EvmAddress.create(request.address);
    return {
      chain: chain ? chain.toJSON() : undefined,
      address: address.toJSON(),
    };
  },

}

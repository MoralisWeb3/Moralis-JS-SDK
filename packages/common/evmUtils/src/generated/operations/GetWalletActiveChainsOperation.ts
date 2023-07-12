import { EvmAddress, EvmAddressInput, EvmAddressJSON, EvmChain, EvmChainInput, EvmChainJSON } from '../../dataTypes';
import { EvmWalletActiveChains, EvmWalletActiveChainsJSON } from '../types/EvmWalletActiveChains';

// request parameters:
// - address ($ref: #/paths/~1wallets~1{address}~1chains/get/parameters/0/schema)
// - chains ($ref: #/components/schemas/chainList)

export interface GetWalletActiveChainsOperationRequest {
  /**
   * @description Wallet address
   */
  readonly address: EvmAddressInput | EvmAddress;
  /**
   * @description The chains to query
   */
  readonly chains?: EvmChainInput[] | EvmChain[];
}

export interface GetWalletActiveChainsOperationRequestJSON {
  readonly address: EvmAddressJSON;
  readonly chains?: EvmChainJSON[];
}

export type GetWalletActiveChainsOperationResponse = EvmWalletActiveChains;
export type GetWalletActiveChainsOperationResponseJSON = EvmWalletActiveChainsJSON;

export const GetWalletActiveChainsOperation = {
  operationId: "getWalletActiveChains",
  groupName: "wallets",
  httpMethod: "get",
  routePattern: "/wallets/{address}/chains",
  parameterNames: ["address","chains"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmWalletActiveChainsJSON): EvmWalletActiveChains {
    return EvmWalletActiveChains.fromJSON(json);
  },

  serializeRequest(request: GetWalletActiveChainsOperationRequest): GetWalletActiveChainsOperationRequestJSON {
    const address = EvmAddress.create(request.address);
    const chains = request.chains ? request.chains.map((item) => EvmChain.create(item)) : undefined;
    return {
      address: address.toJSON(),
      chains: chains ? chains.map((item) => item.toJSON()) : undefined,
    };
  },

}

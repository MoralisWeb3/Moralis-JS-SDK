import { EvmChain, EvmChainInput, EvmChainJSON, EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { EvmNetWorthResult, EvmNetWorthResultJSON } from '../types/EvmNetWorthResult';

// request parameters:
// - chains ($ref: #/components/schemas/chainList)
// - address ($ref: #/paths/~1wallets~1{address}~1net-worth/get/parameters/1/schema)
// - exclude_spam ($ref: #/paths/~1wallets~1{address}~1net-worth/get/parameters/2/schema)
// - exclude_unverified_contracts ($ref: #/paths/~1wallets~1{address}~1net-worth/get/parameters/3/schema)
// - max_token_inactivity ($ref: #/paths/~1wallets~1{address}~1net-worth/get/parameters/4/schema)

export interface GetWalletNetWorthOperationRequest {
  /**
   * @description The chains to query
   */
  readonly chains?: EvmChainInput[] | EvmChain[];
  /**
   * @description The wallet address
   */
  readonly address: EvmAddressInput | EvmAddress;
  /**
   * @description Exclude spam tokens from the result
   */
  readonly excludeSpam?: boolean;
  /**
   * @description Exclude unverified contracts from the result
   */
  readonly excludeUnverifiedContracts?: boolean;
  /**
   * @description Exclude tokens inactive for more than the given amount of days
   */
  readonly maxTokenInactivity?: number;
}

export interface GetWalletNetWorthOperationRequestJSON {
  readonly chains?: EvmChainJSON[];
  readonly address: EvmAddressJSON;
  readonly exclude_spam?: boolean;
  readonly exclude_unverified_contracts?: boolean;
  readonly max_token_inactivity?: number;
}

export type GetWalletNetWorthOperationResponse = EvmNetWorthResult;
export type GetWalletNetWorthOperationResponseJSON = EvmNetWorthResultJSON;

export const GetWalletNetWorthOperation = {
  operationId: "getWalletNetWorth",
  groupName: "wallets",
  httpMethod: "get",
  routePattern: "/wallets/{address}/net-worth",
  parameterNames: ["chains","address","exclude_spam","exclude_unverified_contracts","max_token_inactivity"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmNetWorthResultJSON): EvmNetWorthResult {
    return EvmNetWorthResult.fromJSON(json);
  },

  serializeRequest(request: GetWalletNetWorthOperationRequest): GetWalletNetWorthOperationRequestJSON {
    const chains = request.chains ? request.chains.map((item) => EvmChain.create(item)) : undefined;
    const address = EvmAddress.create(request.address);
    const excludeSpam = request.excludeSpam;
    const excludeUnverifiedContracts = request.excludeUnverifiedContracts;
    const maxTokenInactivity = request.maxTokenInactivity;
    return {
      chains: chains ? chains.map((item) => item.toJSON()) : undefined,
      address: address.toJSON(),
      exclude_spam: excludeSpam,
      exclude_unverified_contracts: excludeUnverifiedContracts,
      max_token_inactivity: maxTokenInactivity,
    };
  },

}

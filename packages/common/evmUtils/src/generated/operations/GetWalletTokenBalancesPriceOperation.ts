import { EvmChain, EvmChainInput, EvmChainJSON, EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { EvmErc20TokenBalanceWithPriceResult, EvmErc20TokenBalanceWithPriceResultJSON } from '../types/EvmErc20TokenBalanceWithPriceResult';

// request parameters:
// - chain ($ref: #/components/schemas/chainList)
// - address ($ref: #/paths/~1wallets~1{address}~1tokens/get/parameters/1/schema)
// - to_block ($ref: #/paths/~1wallets~1{address}~1tokens/get/parameters/2/schema)
// - token_addresses ($ref: #/paths/~1wallets~1{address}~1tokens/get/parameters/3/schema)
// - exclude_spam ($ref: #/paths/~1wallets~1{address}~1tokens/get/parameters/4/schema)
// - exclude_unverified_contracts ($ref: #/paths/~1wallets~1{address}~1tokens/get/parameters/5/schema)
// - cursor ($ref: #/paths/~1wallets~1{address}~1tokens/get/parameters/6/schema)
// - limit ($ref: #/paths/~1wallets~1{address}~1tokens/get/parameters/7/schema)
// - exclude_native ($ref: #/paths/~1wallets~1{address}~1tokens/get/parameters/8/schema)

export interface GetWalletTokenBalancesPriceOperationRequest {
  /**
   * @description The chain to query
   */
  readonly chain?: EvmChainInput | EvmChain;
  /**
   * @description The address from which token balances will be checked
   */
  readonly address: EvmAddressInput | EvmAddress;
  /**
   * @description The block number up to which the balances will be checked.
   */
  readonly toBlock?: number;
  /**
   * @description The addresses to get balances for (optional)
   */
  readonly tokenAddresses?: EvmAddressInput[] | EvmAddress[];
  /**
   * @description Exclude spam tokens from the result
   */
  readonly excludeSpam?: boolean;
  /**
   * @description Exclude unverified contracts from the result
   */
  readonly excludeUnverifiedContracts?: boolean;
  /**
   * @description The cursor returned in the previous response (used for getting the next page).
   */
  readonly cursor?: string;
  /**
   * @description The desired page size of the result.
   */
  readonly limit?: number;
  /**
   * @description Exclude native balance from the result
   */
  readonly excludeNative?: boolean;
}

export interface GetWalletTokenBalancesPriceOperationRequestJSON {
  readonly chain?: EvmChainJSON;
  readonly address: EvmAddressJSON;
  readonly to_block?: number;
  readonly token_addresses?: EvmAddressJSON[];
  readonly exclude_spam?: boolean;
  readonly exclude_unverified_contracts?: boolean;
  readonly cursor?: string;
  readonly limit?: number;
  readonly exclude_native?: boolean;
}

export type GetWalletTokenBalancesPriceOperationResponse = EvmErc20TokenBalanceWithPriceResult;
export type GetWalletTokenBalancesPriceOperationResponseJSON = EvmErc20TokenBalanceWithPriceResultJSON;

export const GetWalletTokenBalancesPriceOperation = {
  operationId: "getWalletTokenBalancesPrice",
  groupName: "wallets",
  httpMethod: "get",
  routePattern: "/wallets/{address}/tokens",
  parameterNames: ["chain","address","to_block","token_addresses","exclude_spam","exclude_unverified_contracts","cursor","limit","exclude_native"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmErc20TokenBalanceWithPriceResultJSON): EvmErc20TokenBalanceWithPriceResult {
    return EvmErc20TokenBalanceWithPriceResult.fromJSON(json);
  },

  serializeRequest(request: GetWalletTokenBalancesPriceOperationRequest): GetWalletTokenBalancesPriceOperationRequestJSON {
    const chain = request.chain ? EvmChain.create(request.chain) : undefined;
    const address = EvmAddress.create(request.address);
    const toBlock = request.toBlock;
    const tokenAddresses = request.tokenAddresses ? request.tokenAddresses.map((item) => EvmAddress.create(item)) : undefined;
    const excludeSpam = request.excludeSpam;
    const excludeUnverifiedContracts = request.excludeUnverifiedContracts;
    const cursor = request.cursor;
    const limit = request.limit;
    const excludeNative = request.excludeNative;
    return {
      chain: chain ? chain.toJSON() : undefined,
      address: address.toJSON(),
      to_block: toBlock,
      token_addresses: tokenAddresses ? tokenAddresses.map((item) => item.toJSON()) : undefined,
      exclude_spam: excludeSpam,
      exclude_unverified_contracts: excludeUnverifiedContracts,
      cursor: cursor,
      limit: limit,
      exclude_native: excludeNative,
    };
  },

}

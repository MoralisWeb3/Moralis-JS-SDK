import { EvmChain, EvmChainInput, EvmChainJSON, EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { EvmErc20TransfersResponse, EvmErc20TransfersResponseJSON } from '../types/EvmErc20TransfersResponse';

// request parameters:
// - chain ($ref: #/components/schemas/chainList)
// - from_block ($ref: #/paths/~1erc20~1transfers/get/parameters/1/schema)
// - to_block ($ref: #/paths/~1erc20~1transfers/get/parameters/2/schema)
// - limit ($ref: #/paths/~1erc20~1transfers/get/parameters/3/schema)
// - contract_addresses ($ref: #/paths/~1erc20~1transfers/get/parameters/4/schema)
// - exclude_contracts ($ref: #/paths/~1erc20~1transfers/get/parameters/5/schema)
// - wallet_addresses ($ref: #/paths/~1erc20~1transfers/get/parameters/6/schema)
// - exclude_wallets ($ref: #/paths/~1erc20~1transfers/get/parameters/7/schema)
// - cursor ($ref: #/paths/~1erc20~1transfers/get/parameters/8/schema)

export interface GetErc20TransfersOperationRequest {
  /**
   * @description The chain to query
   */
  readonly chain?: EvmChainInput | EvmChain;
  /**
   * @description The block number from which the transfers will be returned
   */
  readonly fromBlock?: number;
  /**
   * @description The block number to which the transfers will be returned
   */
  readonly toBlock?: number;
  /**
   * @description The desired page size of the result.
   */
  readonly limit?: number;
  /**
   * @description Contract addresses to only include
   */
  readonly contractAddresses?: EvmAddressInput[] | EvmAddress[];
  /**
   * @description Contract addresses to ignore
   */
  readonly excludeContracts?: EvmAddressInput[] | EvmAddress[];
  /**
   * @description Wallet addresses to only include
   */
  readonly walletAddresses?: EvmAddressInput[] | EvmAddress[];
  /**
   * @description Wallet addresses to ignore
   */
  readonly excludeWallets?: EvmAddressInput[] | EvmAddress[];
  /**
   * @description The cursor returned in the previous response (used to getting the next page).
   */
  readonly cursor?: string;
}

export interface GetErc20TransfersOperationRequestJSON {
  readonly chain?: EvmChainJSON;
  readonly from_block?: number;
  readonly to_block?: number;
  readonly limit?: number;
  readonly contract_addresses?: EvmAddressJSON[];
  readonly exclude_contracts?: EvmAddressJSON[];
  readonly wallet_addresses?: EvmAddressJSON[];
  readonly exclude_wallets?: EvmAddressJSON[];
  readonly cursor?: string;
}

export type GetErc20TransfersOperationResponse = EvmErc20TransfersResponse;
export type GetErc20TransfersOperationResponseJSON = EvmErc20TransfersResponseJSON;

export const GetErc20TransfersOperation = {
  operationId: "getErc20Transfers",
  groupName: "token",
  httpMethod: "get",
  routePattern: "/erc20/transfers",
  parameterNames: ["chain","from_block","to_block","limit","contract_addresses","exclude_contracts","wallet_addresses","exclude_wallets","cursor"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmErc20TransfersResponseJSON): EvmErc20TransfersResponse {
    return EvmErc20TransfersResponse.fromJSON(json);
  },

  serializeRequest(request: GetErc20TransfersOperationRequest): GetErc20TransfersOperationRequestJSON {
    const chain = request.chain ? EvmChain.create(request.chain) : undefined;
    const fromBlock = request.fromBlock;
    const toBlock = request.toBlock;
    const limit = request.limit;
    const contractAddresses = request.contractAddresses ? request.contractAddresses.map((item) => EvmAddress.create(item)) : undefined;
    const excludeContracts = request.excludeContracts ? request.excludeContracts.map((item) => EvmAddress.create(item)) : undefined;
    const walletAddresses = request.walletAddresses ? request.walletAddresses.map((item) => EvmAddress.create(item)) : undefined;
    const excludeWallets = request.excludeWallets ? request.excludeWallets.map((item) => EvmAddress.create(item)) : undefined;
    const cursor = request.cursor;
    return {
      chain: chain ? chain.toJSON() : undefined,
      from_block: fromBlock,
      to_block: toBlock,
      limit: limit,
      contract_addresses: contractAddresses ? contractAddresses.map((item) => item.toJSON()) : undefined,
      exclude_contracts: excludeContracts ? excludeContracts.map((item) => item.toJSON()) : undefined,
      wallet_addresses: walletAddresses ? walletAddresses.map((item) => item.toJSON()) : undefined,
      exclude_wallets: excludeWallets ? excludeWallets.map((item) => item.toJSON()) : undefined,
      cursor: cursor,
    };
  },

}

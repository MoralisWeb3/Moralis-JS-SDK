import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import {
  AptErc20TokenBalance,
  AptErc20TokenBalanceJSON,
  AptErc20TokenBalanceInput,
} from '../types/AptErc20TokenBalance';

export interface AptGetWalletTokenBalancesOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly address: string;
  readonly to_block?: number;
  readonly token_addresses?: string[];
}

export interface AptGetWalletTokenBalancesOperationRequest {
  readonly chain?: AptChainListInput;
  readonly address: string;
  readonly toBlock?: number;
  readonly tokenAddresses?: string[];
}

/**
 * @description Get token balances for a specific wallet address.
 */
export const AptGetWalletTokenBalancesOperation = {
  operationId: 'getWalletTokenBalances',
  httpMethod: 'get',
  routePattern: '/{address}/erc20',
  parameterNames: ['chain', 'address', 'to_block', 'token_addresses'],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptErc20TokenBalanceJSON[]): AptErc20TokenBalance[] {
    return json.map((item) => AptErc20TokenBalance.fromJSON(item));
  },

  serializeRequest(request: AptGetWalletTokenBalancesOperationRequest): AptGetWalletTokenBalancesOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const address = request.address;
    const toBlock = request.toBlock;
    const tokenAddresses = request.tokenAddresses;
    return {
      chain: chain ? chain.toJSON() : undefined,
      address: address,
      to_block: toBlock,
      token_addresses: tokenAddresses,
    };
  },
};

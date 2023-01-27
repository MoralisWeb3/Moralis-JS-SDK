import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import {
  AptNativeBalancesItem,
  AptNativeBalancesItemJSON,
  AptNativeBalancesItemInput,
} from '../types/AptNativeBalancesItem';

export interface AptGetNativeBalancesForAddressesOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly providerUrl?: string;
  readonly to_block?: number;
  readonly wallet_addresses: string[];
}

export interface AptGetNativeBalancesForAddressesOperationRequest {
  readonly chain?: AptChainListInput;
  readonly providerUrl?: string;
  readonly toBlock?: number;
  readonly walletAddresses: string[];
}

/**
 * @description Get the native balances for a set of specific addresses
 */
export const AptGetNativeBalancesForAddressesOperation = {
  operationId: 'getNativeBalancesForAddresses',
  httpMethod: 'get',
  routePattern: '/wallets/balances',
  parameterNames: ['chain', 'providerUrl', 'to_block', 'wallet_addresses'],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptNativeBalancesItemJSON[]): AptNativeBalancesItem[] {
    return json.map((item) => AptNativeBalancesItem.fromJSON(item));
  },

  serializeRequest(
    request: AptGetNativeBalancesForAddressesOperationRequest,
  ): AptGetNativeBalancesForAddressesOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const providerUrl = request.providerUrl;
    const toBlock = request.toBlock;
    const walletAddresses = request.walletAddresses;
    return {
      chain: chain ? chain.toJSON() : undefined,
      providerUrl: providerUrl,
      to_block: toBlock,
      wallet_addresses: walletAddresses,
    };
  },
};

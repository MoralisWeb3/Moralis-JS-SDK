import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptNativeBalance, AptNativeBalanceJSON, AptNativeBalanceInput } from '../types/AptNativeBalance';

export interface AptGetNativeBalanceOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly address: string;
  readonly to_block?: number;
}

export interface AptGetNativeBalanceOperationRequest {
  readonly chain?: AptChainListInput;
  readonly address: string;
  readonly toBlock?: number;
}

/**
 * @description Get the native balance for a specific wallet address.
 */
export const AptGetNativeBalanceOperation = {
  operationId: 'getNativeBalance',
  httpMethod: 'get',
  routePattern: '/{address}/balance',
  parameterNames: ['chain', 'address', 'to_block'],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptNativeBalanceJSON): AptNativeBalance {
    return AptNativeBalance.fromJSON(json);
  },

  serializeRequest(request: AptGetNativeBalanceOperationRequest): AptGetNativeBalanceOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const address = request.address;
    const toBlock = request.toBlock;
    return {
      chain: chain ? chain.toJSON() : undefined,
      address: address,
      to_block: toBlock,
    };
  },
};

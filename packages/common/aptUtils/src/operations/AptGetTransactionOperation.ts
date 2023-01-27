import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptBlockTransaction, AptBlockTransactionJSON, AptBlockTransactionInput } from '../types/AptBlockTransaction';

export interface AptGetTransactionOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly transaction_hash: string;
}

export interface AptGetTransactionOperationRequest {
  readonly chain?: AptChainListInput;
  readonly transactionHash: string;
}

/**
 * @description Get the contents of a transaction by the given transaction hash.
 */
export const AptGetTransactionOperation = {
  operationId: 'getTransaction',
  httpMethod: 'get',
  routePattern: '/transaction/{transaction_hash}',
  parameterNames: ['chain', 'transaction_hash'],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptBlockTransactionJSON): AptBlockTransaction {
    return AptBlockTransaction.fromJSON(json);
  },

  serializeRequest(request: AptGetTransactionOperationRequest): AptGetTransactionOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const transactionHash = request.transactionHash;
    return {
      chain: chain ? chain.toJSON() : undefined,
      transaction_hash: transactionHash,
    };
  },
};

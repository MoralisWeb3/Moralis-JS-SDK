import { Core, Camelize, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmInternalTransaction } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getInternalTransactions';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];

type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetInternalTransactionsRequest extends Camelize<Omit<RequestParams, 'chain'>> {
  chain?: EvmChainish;
}

export type GetInternalTransactionsJSONRequest = ReturnType<typeof serializeRequest>;

export type GetInternalTransactionsJSONResponse = SuccessResponse;

export type GetInternalTransactionsResponse = ReturnType<typeof deserializeResponse>;

export interface GetInternalTransactionsResponseAdapter
  extends ResponseAdapter<GetInternalTransactionsResponse, GetInternalTransactionsJSONResponse> {}

/** Get native transactions ordered by block number in descending order. */
export const getInternalTransactionsOperation: Operation<
  GetInternalTransactionsRequest,
  GetInternalTransactionsJSONRequest,
  GetInternalTransactionsResponse,
  GetInternalTransactionsJSONResponse
> = {
  method: 'GET',
  name: 'getInternalTransactions',
  id: 'getInternalTransactions',
  groupName: 'transaction',
  urlPathPattern: '/transaction/{transactionHash}/internal-transactions',
  urlPathParamNames: ['transactionHash'],
  urlSearchParamNames: ['chain'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetInternalTransactionsRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    transactionHash: request.transactionHash,
  };
}

function serializeRequest(request: GetInternalTransactionsRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    transactionHash: request.transactionHash,
  };
}

function deserializeRequest(
  jsonRequest: GetInternalTransactionsJSONRequest,
  core: Core,
): GetInternalTransactionsRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    transactionHash: jsonRequest.transactionHash,
  };
}

function deserializeResponse(
  jsonResponse: GetInternalTransactionsJSONResponse,
  request: GetInternalTransactionsJSONRequest,
  core: Core,
) {
  return (jsonResponse ?? []).map((transaction) => {
    const chain = EvmChainResolver.resolve(request.chain, core);
    return EvmInternalTransaction.create(
      {
        chain,
        blockHash: transaction.block_hash,
        blockNumber: transaction.block_number,
        from: transaction.from,
        gas: transaction.gas,
        gasUsed: transaction.gas_used,
        input: transaction.input,
        output: transaction.output,
        to: transaction.to,
        transactionHash: transaction.transaction_hash,
        type: transaction.type,
        value: transaction.value,
      },
      core,
    );
  });
}

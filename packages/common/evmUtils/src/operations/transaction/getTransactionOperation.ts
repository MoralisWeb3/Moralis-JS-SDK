import { Core, Camelize, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmTransaction, EvmTransactionLog, LogTopic } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getTransaction';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];

type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

export interface GetTransactionRequest extends Camelize<Omit<RequestParams, 'chain'>> {
  chain?: EvmChainish;
}

export type GetTransactionJSONRequest = ReturnType<typeof serializeRequest>;

export type GetTransactionJSONResponse = SuccessResponse;

export type GetTransactionResponse = ReturnType<typeof deserializeResponse>;

export interface GetTransactionResponseAdapter
  extends ResponseAdapter<GetTransactionResponse, GetTransactionJSONResponse> {}

/** Get the contents of a transaction by the given transaction hash. */
export const getTransactionOperation: Operation<
  GetTransactionRequest,
  GetTransactionJSONRequest,
  GetTransactionResponse,
  GetTransactionJSONResponse
> = {
  method: 'GET',
  name: 'getTransaction',
  id: 'getTransaction',
  groupName: 'transaction',
  isNullable: true,
  urlPathPattern: '/transaction/{transactionHash}',
  urlPathParamNames: ['transactionHash'],
  urlSearchParamNames: ['chain', 'subdomain'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

function getRequestUrlParams(request: GetTransactionRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    subdomain: request.subdomain,
    transactionHash: request.transactionHash,
  };
}

function serializeRequest(request: GetTransactionRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    subdomain: request.subdomain,
    transactionHash: request.transactionHash,
  };
}

function deserializeRequest(jsonRequest: GetTransactionJSONRequest, core: Core): GetTransactionRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    subdomain: jsonRequest.subdomain,
    transactionHash: jsonRequest.transactionHash,
  };
}
//TODO: I noticed that the docs comes with a type of "string | unknown" which automatically resolves to "unknown". I think we should fix this in the api, casting for now
function deserializeResponse(jsonResponse: GetTransactionJSONResponse, request: GetTransactionJSONRequest, core: Core) {
  return EvmTransaction.create(
    {
      from: jsonResponse.from_address,
      to: jsonResponse.to_address as string,
      value: jsonResponse.value,
      gasPrice: jsonResponse.gas_price,
      gasUsed: jsonResponse.receipt_gas_used,
      data: jsonResponse.input,
      nonce: jsonResponse.nonce,
      blockHash: jsonResponse.block_hash,
      blockNumber: jsonResponse.block_number,
      blockTimestamp: jsonResponse.block_timestamp,
      index: jsonResponse.transaction_index,
      chain: EvmChainResolver.resolve(request.chain, core),
      hash: jsonResponse.hash,
      gas: jsonResponse.gas,
      cumulativeGasUsed: jsonResponse.receipt_cumulative_gas_used,
      contractAddress: jsonResponse.receipt_contract_address as string,
      logs: (jsonResponse.logs ?? []).map((log) =>
        EvmTransactionLog.create(
          {
            address: log.address,
            blockHash: log.block_hash,
            blockNumber: +log.block_number,
            data: log.data,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            topics: [log.topic0, log.topic1 as LogTopic, log.topic2 as LogTopic, log.topic3 as LogTopic],
            transactionHash: log.transaction_hash,
            blockTimestamp: log.block_timestamp,
            logIndex: +log.log_index,
            transactionIndex: +log.transaction_index,
            chain: EvmChainResolver.resolve(request.chain, core),
          },
          core,
        ),
      ),
      receiptRoot: jsonResponse.receipt_root as string,
      receiptStatus: jsonResponse.receipt_status,
    },
    core,
  );
}

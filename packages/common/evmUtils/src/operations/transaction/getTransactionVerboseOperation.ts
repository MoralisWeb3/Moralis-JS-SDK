import { Core, Camelize, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmTransactionLogDecoded, EvmTransactionVerbose, LogTopic } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { components, operations } from '../openapi';

type OperationId = 'getTransactionVerbose';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];

type RequestParams = PathParams & QueryParams;

// TODO: fix reference when swagger is updated
// type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];
type SuccessResponse = components['schemas']['blockTransactionVerbose'];

export interface GetTransactionVerboseRequest extends Camelize<Omit<RequestParams, 'chain'>> {
  chain?: EvmChainish;
}

export type GetTransactionVerboseJSONRequest = ReturnType<typeof serializeRequest>;

export type GetTransactionVerboseJSONResponse = SuccessResponse;

export type GetTransactionVerboseResponse = ReturnType<typeof deserializeResponse>;

export interface GetTransactionVerboseResponseAdapter
  extends ResponseAdapter<GetTransactionVerboseResponse, GetTransactionVerboseJSONResponse> {}

/** Get the contents of a transaction by the given transaction hash. */
export const getTransactionVerboseOperation: Operation<
  GetTransactionVerboseRequest,
  GetTransactionVerboseJSONRequest,
  GetTransactionVerboseResponse,
  GetTransactionVerboseJSONResponse
> = {
  method: 'GET',
  name: 'getTransactionVerbose',
  id: 'getTransactionVerbose',
  groupName: 'transaction',
  isNullable: true,
  urlPathPattern: '/transaction/{transactionHash}/verbose',
  urlPathParamNames: ['transactionHash'],
  urlSearchParamNames: ['chain'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

function getRequestUrlParams(request: GetTransactionVerboseRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    transactionHash: request.transactionHash,
  };
}

function serializeRequest(request: GetTransactionVerboseRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    transactionHash: request.transactionHash,
  };
}

function deserializeRequest(jsonRequest: GetTransactionVerboseJSONRequest, core: Core): GetTransactionVerboseRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    transactionHash: jsonRequest.transactionHash,
  };
}
function deserializeResponse(
  jsonResponse: GetTransactionVerboseJSONResponse,
  request: GetTransactionVerboseJSONRequest,
  core: Core,
) {
  return EvmTransactionVerbose.create(
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
        EvmTransactionLogDecoded.create(
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
            decodedEvent: log.decoded_event,
          },
          core,
        ),
      ),
      decodedCall: jsonResponse.decoded_call,
      receiptRoot: jsonResponse.receipt_root as string,
      receiptStatus: jsonResponse.receipt_status,
    },
    core,
  );
}

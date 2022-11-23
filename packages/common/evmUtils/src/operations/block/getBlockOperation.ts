import { Core, Camelize, Operation, toCamelCase, ResponseAdapter } from '@moralisweb3/common-core';
import { EvmBlock, EvmChain, EvmChainish, EvmTransaction, EvmTransactionLog, LogTopic } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getBlock';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetBlockRequest extends Camelize<Omit<RequestParams, 'chain'>> {
  chain?: EvmChainish;
}

export type GetBlockJSONRequest = ReturnType<typeof serializeRequest>;

export type GetBlockJSONResponse = SuccessResponse;

export type GetBlockResponse = ReturnType<typeof deserializeResponse>;

export interface GetBlockResponseAdapter extends ResponseAdapter<GetBlockResponse, GetBlockJSONResponse> {}

/** Get the contents of a block given the block hash. */
export const getBlockOperation: Operation<
  GetBlockRequest,
  GetBlockJSONRequest,
  GetBlockResponse,
  GetBlockJSONResponse
> = {
  method: 'GET',
  name: 'getBlock',
  id: 'getBlock',
  groupName: 'block',
  isNullable: true,
  urlPathPattern: '/block/{blockNumberOrHash}',
  urlPathParamNames: ['blockNumberOrHash'],
  urlSearchParamNames: ['chain', 'subdomain'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetBlockRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    subdomain: request.subdomain,
    blockNumberOrHash: request.blockNumberOrHash,
  };
}

function deserializeResponse(jsonResponse: GetBlockJSONResponse, request: GetBlockRequest, core: Core) {
  const data = toCamelCase(jsonResponse);
  const chain = EvmChainResolver.resolve(request.chain, core);

  // TODO: account for changes in api, now we have unknown types for addresses
  // OR fix the types correctly in api
  // I noticed that the docs comes with a type of "string | unknown" which automatically resolves to "unknown". I think we should fix this in the api, casting for now
  return EvmBlock.create(
    {
      ...data,
      chain,
      transactions: (data.transactions ?? []).map((transaction) =>
        EvmTransaction.create(
          {
            cumulativeGasUsed: transaction.receiptCumulativeGasUsed,
            gasPrice: transaction.gasPrice,
            gasUsed: transaction.receiptGasUsed,
            index: transaction.transactionIndex,
            contractAddress: transaction.receiptContractAddress as string | undefined,
            receiptRoot: transaction.receiptRoot as string | undefined,
            receiptStatus: +transaction.receiptStatus,
            chain,
            data: transaction.input,
            from: transaction.fromAddress,
            hash: transaction.hash,
            nonce: transaction.nonce,
            value: transaction.value,
            blockHash: transaction.blockHash,
            blockNumber: +transaction.blockNumber,
            blockTimestamp: new Date(transaction.blockTimestamp),
            gas: transaction.gas,
            to: transaction.toAddress as string,
            logs: (transaction.logs ?? []).map((jsonLog) => {
              const log = toCamelCase(jsonLog);
              return EvmTransactionLog.create({
                chain,
                address: log.address,
                blockHash: log.blockHash,
                blockNumber: +log.blockNumber,
                data: log.data,
                topics: [log.topic0, log.topic1 as LogTopic, log.topic2 as LogTopic, log.topic3 as LogTopic],
                transactionHash: log.transactionHash,
                blockTimestamp: log.blockTimestamp,
                logIndex: +log.logIndex,
                transactionIndex: +log.transactionIndex,
              });
            }),
          },
          core,
        ),
      ),
    },
    core,
  );
}

function serializeRequest(request: GetBlockRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    subdomain: request.subdomain,
    blockNumberOrHash: request.blockNumberOrHash,
  };
}

function deserializeRequest(jsonRequest: GetBlockJSONRequest, core: Core): GetBlockRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    subdomain: jsonRequest.subdomain,
    blockNumberOrHash: jsonRequest.blockNumberOrHash,
  };
}

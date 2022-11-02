import { Core, Camelize, Operation, toCamelCase } from '@moralisweb3/common-core';
import { EvmBlock, EvmChain, EvmChainish, EvmTransaction, EvmTransactionLog } from '../../dataTypes';
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
  urlPathPattern: '/block/{block_number_or_hash}',
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
    block_number_or_hash: request.blockNumberOrHash,
  };
}

function deserializeResponse(jsonResponse: GetBlockJSONResponse, request: GetBlockRequest, core: Core) {
  const data = toCamelCase(jsonResponse);
  const chain = EvmChainResolver.resolve(request.chain, core);

  // TODO: account for changes in api, now we have unknown types for addresses
  // OR fix the types correctly in api
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
            // @ts-ignore TODO: fix typing
            contractAddress: transaction.receiptContractAddress,
            // @ts-ignore TODO: fix typing
            receiptRoot: transaction.receiptRoot,
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
            // @ts-ignore TODO: fix typing
            to: transaction.toAddress,
            logs: (transaction.logs ?? []).map((log) =>
              EvmTransactionLog.create({
                chain,
                address: log.address,
                // @ts-ignore TODO: fix typing
                blockHash: log.blockHash,
                // @ts-ignore TODO: fix typing
                blockNumber: +log.blockNumber,
                data: log.data,
                // @ts-ignore TODO: fix typing
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                topics: [log.topic0, log.topic1!, log.topic2!, log.topic3!],
                // @ts-ignore TODO: fix typing
                transactionHash: log.transactionHash,
                // @ts-ignore TODO: fix typing
                blockTimestamp: log.blockTimestamp,
                // @ts-ignore TODO: fix typing
                logIndex: +log.logIndex,
                // @ts-ignore TODO: fix typing
                transactionIndex: +log.transactionIndex,
              }),
            ),
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

import { EvmAddress, EvmChainish } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { resolveDefaultChain } from '../../utils/resolveDefaultParams';
import { toCamelCase } from '../../utils/toCamelCase';
import { EvmResolver } from '../Resolver';

type operation = 'getBlock';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Omit<ApiParams, 'chain'> {
  chain?: EvmChainish;
  // TODO: add camelCased block_number_or_hash
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

const apiToResult = (apiData: ApiResult) => {
  const data = toCamelCase(apiData);

  return {
    ...data,
    miner: new EvmAddress(data.miner),
    transactions: data.transactions.map((transaction) => ({
      ...transaction,
      fromAddress: new EvmAddress(transaction.fromAddress),
      toAddress: new EvmAddress(transaction.toAddress),
      receiptContractAddress: transaction.receiptContractAddress
        ? new EvmAddress(transaction.receiptContractAddress)
        : null,
      logs: transaction.logs.map((log) => ({
        ...log,
        address: new EvmAddress(log.address),
      })),
    })),
  };
};
type AdaptedResult = ReturnType<typeof apiToResult>;

// TODO: use Transaction DataTypes
export const getBlockResolver = new EvmResolver<ApiParams, Params, ApiResult, AdaptedResult, AdaptedResult>({
  name: 'getBlock',
  getPath: (params: Params) => `block/${params.block_number_or_hash}`,
  apiToResult: (apiData: ApiResult) => {
    const data = toCamelCase(apiData);

    return {
      ...data,
      miner: new EvmAddress(data.miner),
      transactions: data.transactions.map((transaction) => ({
        ...transaction,
        fromAddress: new EvmAddress(transaction.fromAddress),
        toAddress: new EvmAddress(transaction.toAddress),
        receiptContractAddress: transaction.receiptContractAddress
          ? new EvmAddress(transaction.receiptContractAddress)
          : null,
        logs: transaction.logs.map((log) => ({
          ...log,
          address: new EvmAddress(log.address),
        })),
      })),
    };
  },
  resultToJson: (data) => data,
  parseParams: (params) => ({
    ...params,
    chain: resolveDefaultChain(params.chain).apiHex,
  }),
});

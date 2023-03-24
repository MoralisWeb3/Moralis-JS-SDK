import Moralis from 'moralis';
import { GetInternalTransactionsRequest, GetInternalTransactionsResponse, getInternalTransactionsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmInternalTransactionsParams = Partial<GetInternalTransactionsRequest>;
export type UseEvmInternalTransactionsQueryOptions = QueryOptions<GetInternalTransactionsResponse, UseEvmInternalTransactionsParams>;

export function useEvmInternalTransactions({ transactionHash, chain }: UseEvmInternalTransactionsParams = {}, queryOptions: UseEvmInternalTransactionsQueryOptions = {}) {
  const resolver = useOperationResolver(getInternalTransactionsOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(transactionHash);
  }, [transactionHash]);

  const queryKey: [string, Partial<GetInternalTransactionsRequest>] = useMemo(() => {
    return [
      getInternalTransactionsOperation.id,
      {
        transactionHash, chain
      },
    ];
  }, [transactionHash, chain]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['transactionHash']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
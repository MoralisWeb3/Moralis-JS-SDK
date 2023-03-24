import Moralis from 'moralis';
import { GetTransactionRequest, GetTransactionResponse, getTransactionOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useNullableOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmTransactionParams = Partial<GetTransactionRequest>;
export type UseEvmTransactionQueryOptions = QueryOptions<GetTransactionResponse | null, UseEvmTransactionParams>;

export function useEvmTransaction({ transactionHash, chain, include }: UseEvmTransactionParams = {}, queryOptions: UseEvmTransactionQueryOptions = {}) {
  const resolver = useNullableOperationResolver(getTransactionOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(transactionHash);
  }, [transactionHash]);

  const queryKey: [string, Partial<GetTransactionRequest>] = useMemo(() => {
    return [
      getTransactionOperation.id,
      {
        transactionHash, chain, include
      },
    ];
  }, [transactionHash, chain, include]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['transactionHash']);
      const response = await resolver.fetch(params);
      return response?.result || null;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
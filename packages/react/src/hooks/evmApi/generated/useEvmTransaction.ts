import Moralis from 'moralis';
import { GetTransactionRequest, GetTransactionResponse, getTransactionOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useNullableOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmTransactionParams = UseMoralisQueryParams<GetTransactionResponse| null, Partial<GetTransactionRequest>>

export function useEvmTransaction({ transactionHash, chain, ...queryParams }: UseEvmTransactionParams = {}) {
  const resolver = useNullableOperationResolver(getTransactionOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(transactionHash);
  }, [transactionHash]);

  const queryKey: [string, Partial<GetTransactionRequest>] = useMemo(() => {
    return [
      getTransactionOperation.id,
      {
        transactionHash, chain
      },
    ];
  }, [transactionHash, chain]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['transactionHash']);
      const response = await resolver.fetch(params);
      return response?.result || null;
    },
    ...queryParams,
    enabled: hasRequiredParams && queryParams.enabled,
  });
}
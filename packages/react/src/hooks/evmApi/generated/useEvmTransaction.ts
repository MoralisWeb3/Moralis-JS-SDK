import Moralis from 'moralis';
import { GetTransactionRequest, GetTransactionResponse, getTransactionOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useNullableOperationResolver, useQuery } from '../../utils';

export type UseEvmTransactionParams = UseMoralisQueryParams<GetTransactionResponse, GetTransactionRequest>

export function useEvmTransaction({ transactionHash,chain, ...queryParams }: UseEvmTransactionParams = {}) {
  const resolver = useNullableOperationResolver(getTransactionOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetTransactionRequest] | undefined = useMemo(() => {
    if (transactionHash ) {
      return [
      getTransactionOperation.id,
      {
        transactionHash,chain
      },
    ];
    }
      return;
  }, [transactionHash,chain]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const { result } = await resolver.fetch(request);
      return result;
    },
    ...queryParams,
    enabled: queryKey && queryParams.enabled,
  });
}
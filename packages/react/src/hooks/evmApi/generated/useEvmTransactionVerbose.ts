import Moralis from 'moralis';
import { GetTransactionVerboseRequest, GetTransactionVerboseResponse, getTransactionVerboseOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useNullableOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmTransactionVerboseParams = Partial<GetTransactionVerboseRequest>;
export type UseEvmTransactionVerboseQueryOptions = QueryOptions<GetTransactionVerboseResponse | null, UseEvmTransactionVerboseParams>;

export function useEvmTransactionVerbose({ transactionHash, chain }: UseEvmTransactionVerboseParams = {}, queryOptions: UseEvmTransactionVerboseQueryOptions = {}) {
  const resolver = useNullableOperationResolver(getTransactionVerboseOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(transactionHash);
  }, [transactionHash]);

  const queryKey: [string, Partial<GetTransactionVerboseRequest>] = useMemo(() => {
    return [
      getTransactionVerboseOperation.id,
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
      return response?.result || null;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
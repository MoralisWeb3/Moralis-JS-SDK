import Moralis from 'moralis';
import { GetBlockRequest, GetBlockResponse, getBlockOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useNullableOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmBlockParams = Partial<GetBlockRequest>;
export type UseEvmBlockQueryOptions = QueryOptions<GetBlockResponse | null, UseEvmBlockParams>;

export function useEvmBlock({ blockNumberOrHash, chain, include }: UseEvmBlockParams = {}, queryOptions: UseEvmBlockQueryOptions = {}) {
  const resolver = useNullableOperationResolver(getBlockOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(blockNumberOrHash);
  }, [blockNumberOrHash]);

  const queryKey: [string, Partial<GetBlockRequest>] = useMemo(() => {
    return [
      getBlockOperation.id,
      {
        blockNumberOrHash, chain, include
      },
    ];
  }, [blockNumberOrHash, chain, include]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['blockNumberOrHash']);
      const response = await resolver.fetch(params);
      return response?.result || null;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
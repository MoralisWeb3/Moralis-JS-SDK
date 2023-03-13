import Moralis from 'moralis';
import { GetBlockRequest, GetBlockResponse, getBlockOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useNullableOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmBlockParams = UseMoralisQueryParams<GetBlockResponse| null, Partial<GetBlockRequest>>

export function useEvmBlock({ blockNumberOrHash, chain, ...queryParams }: UseEvmBlockParams = {}) {
  const resolver = useNullableOperationResolver(getBlockOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(blockNumberOrHash);
  }, [blockNumberOrHash]);

  const queryKey: [string, Partial<GetBlockRequest>] = useMemo(() => {
    return [
      getBlockOperation.id,
      {
        blockNumberOrHash, chain
      },
    ];
  }, [blockNumberOrHash, chain]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['blockNumberOrHash']);
      const response = await resolver.fetch(params);
      return response?.result || null;
    },
    ...queryParams,
    enabled: hasRequiredParams && queryParams.enabled,
  });
}
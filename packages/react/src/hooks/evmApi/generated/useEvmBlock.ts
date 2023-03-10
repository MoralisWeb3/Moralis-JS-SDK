import Moralis from 'moralis';
import { GetBlockRequest, GetBlockResponse, getBlockOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useNullableOperationResolver, useQuery } from '../../utils';

export type UseEvmBlockParams = UseMoralisQueryParams<GetBlockResponse, GetBlockRequest>

export function useEvmBlock({ blockNumberOrHash,chain, ...queryParams }: UseEvmBlockParams = {}) {
  const resolver = useNullableOperationResolver(getBlockOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetBlockRequest] | undefined = useMemo(() => {
    if (blockNumberOrHash ) {
      return [
      getBlockOperation.id,
      {
        blockNumberOrHash,chain
      },
    ];
    }
      return;
  }, [blockNumberOrHash,chain]);

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
import Moralis from 'moralis';
import { GetDateToBlockRequest, GetDateToBlockResponse, getDateToBlockOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseEvmDateToBlockParams = UseMoralisQueryParams<GetDateToBlockResponse, GetDateToBlockRequest>

export function useEvmDateToBlock({ chain,date, ...queryParams }: UseEvmDateToBlockParams = {}) {
  const resolver = useOperationResolver(getDateToBlockOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetDateToBlockRequest] | undefined = useMemo(() => {
      return [
      getDateToBlockOperation.id,
        {
          chain,date
        },
      ]
  }, [chain,date]);

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
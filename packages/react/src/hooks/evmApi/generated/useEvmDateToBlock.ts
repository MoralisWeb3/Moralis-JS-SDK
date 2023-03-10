import Moralis from 'moralis';
import { GetDateToBlockRequest, GetDateToBlockResponse, getDateToBlockOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseEvmDateToBlockParams = UseMoralisQueryParams<GetDateToBlockResponse, GetDateToBlockRequest>

export function useEvmDateToBlock({ chain,date, ...queryParams }: UseEvmDateToBlockParams = {}) {
  const resolver = useOperationResolver(getDateToBlockOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetDateToBlockRequest] | undefined = useMemo(() => {
    if (date ) {
      return [
      getDateToBlockOperation.id,
      {
        chain,date
      },
    ];
    }
      return;
  }, [chain,date]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const response = await resolver.fetch(request);
      return response.result;
    },
    ...queryParams,
    enabled: queryKey && queryParams.enabled,
  });
}
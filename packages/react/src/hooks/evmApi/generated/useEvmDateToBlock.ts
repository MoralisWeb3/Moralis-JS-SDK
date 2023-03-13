import Moralis from 'moralis';
import { GetDateToBlockRequest, GetDateToBlockResponse, getDateToBlockOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmDateToBlockParams = UseMoralisQueryParams<GetDateToBlockResponse, Partial<GetDateToBlockRequest>>

export function useEvmDateToBlock({ chain, date, ...queryParams }: UseEvmDateToBlockParams = {}) {
  const resolver = useOperationResolver(getDateToBlockOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(date);
  }, [date]);

  const queryKey: [string, Partial<GetDateToBlockRequest>] = useMemo(() => {
    return [
      getDateToBlockOperation.id,
      {
        chain, date
      },
    ];
  }, [chain, date]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['date']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    ...queryParams,
    enabled: hasRequiredParams && queryParams.enabled,
  });
}
import Moralis from 'moralis';
import { GetBalanceRequest, GetBalanceResponse, getBalanceOperation } from 'moralis/common-sol-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseSolBalanceParams = Partial<GetBalanceRequest>;
export type UseSolBalanceQueryOptions = QueryOptions<GetBalanceResponse, UseSolBalanceParams>;

export function useSolBalance({ network, address }: UseSolBalanceParams = {}, queryOptions: UseSolBalanceQueryOptions = {}) {
  const resolver = useOperationResolver(getBalanceOperation, Moralis.SolApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetBalanceRequest>] = useMemo(() => {
    return [
      getBalanceOperation.id,
      {
        network, address
      },
    ];
  }, [network, address]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
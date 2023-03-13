import Moralis from 'moralis';
import { GetBalanceRequest, GetBalanceResponse, getBalanceOperation } from 'moralis/common-sol-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseSolBalanceParams = UseMoralisQueryParams<GetBalanceResponse, Partial<GetBalanceRequest>>

export function useSolBalance({ network, address, ...queryParams }: UseSolBalanceParams = {}) {
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
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    ...queryParams,
    enabled: hasRequiredParams && queryParams.enabled,
  });
}
import Moralis from 'moralis';
import { GetTokenAllowanceRequest, GetTokenAllowanceResponse, getTokenAllowanceOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseEvmTokenAllowanceParams = UseMoralisQueryParams<GetTokenAllowanceResponse, GetTokenAllowanceRequest>

export function useEvmTokenAllowance({ address,chain,ownerAddress,spenderAddress, ...queryParams }: UseEvmTokenAllowanceParams = {}) {
  const resolver = useOperationResolver(getTokenAllowanceOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetTokenAllowanceRequest] | undefined = useMemo(() => {
    if (ownerAddress &&spenderAddress &&address ) {
      return [
      getTokenAllowanceOperation.id,
      {
        address,chain,ownerAddress,spenderAddress
      },
    ];
    }
      return;
  }, [address,chain,ownerAddress,spenderAddress]);

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
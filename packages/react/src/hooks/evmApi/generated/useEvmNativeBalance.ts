import Moralis from 'moralis';
import { GetNativeBalanceRequest, GetNativeBalanceResponse, getNativeBalanceOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseEvmNativeBalanceParams = UseMoralisQueryParams<GetNativeBalanceResponse, GetNativeBalanceRequest>

export function useEvmNativeBalance({ address,chain,toBlock, ...queryParams }: UseEvmNativeBalanceParams = {}) {
  const resolver = useOperationResolver(getNativeBalanceOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetNativeBalanceRequest] | undefined = useMemo(() => {
    if (address ) {
      return [
      getNativeBalanceOperation.id,
      {
        address,chain,toBlock
      },
    ];
    }
      return;
  }, [address,chain,toBlock]);

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
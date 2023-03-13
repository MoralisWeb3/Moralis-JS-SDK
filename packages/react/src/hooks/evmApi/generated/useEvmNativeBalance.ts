import Moralis from 'moralis';
import { GetNativeBalanceRequest, GetNativeBalanceResponse, getNativeBalanceOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmNativeBalanceParams = UseMoralisQueryParams<GetNativeBalanceResponse, Partial<GetNativeBalanceRequest>>

export function useEvmNativeBalance({ address, chain, toBlock, ...queryParams }: UseEvmNativeBalanceParams = {}) {
  const resolver = useOperationResolver(getNativeBalanceOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetNativeBalanceRequest>] = useMemo(() => {
    return [
      getNativeBalanceOperation.id,
      {
        address, chain, toBlock
      },
    ];
  }, [address, chain, toBlock]);

  return useQuery({
    ...queryParams,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryParams.enabled,
  });
}
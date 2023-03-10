import Moralis from 'moralis';
import { GetNativeBalancesForAddressesRequest, GetNativeBalancesForAddressesResponse, getNativeBalancesForAddressesOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseEvmNativeBalancesForAddressesParams = UseMoralisQueryParams<GetNativeBalancesForAddressesResponse, GetNativeBalancesForAddressesRequest>

export function useEvmNativeBalancesForAddresses({ chain, providerUrl, toBlock, walletAddresses, ...queryParams }: UseEvmNativeBalancesForAddressesParams = {}) {
  const resolver = useOperationResolver(getNativeBalancesForAddressesOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetNativeBalancesForAddressesRequest] | undefined = useMemo(() => {
    if (walletAddresses) {
      return [
      getNativeBalancesForAddressesOperation.id,
      {
        chain, providerUrl, toBlock, walletAddresses
      },
    ];
    }
      return;
  }, [chain, providerUrl, toBlock, walletAddresses]);

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
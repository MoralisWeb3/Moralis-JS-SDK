import Moralis from 'moralis';
import { GetNativeBalancesForAddressesRequest, GetNativeBalancesForAddressesResponse, getNativeBalancesForAddressesOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmNativeBalancesForAddressesParams = UseMoralisQueryParams<GetNativeBalancesForAddressesResponse, Partial<GetNativeBalancesForAddressesRequest>>

export function useEvmNativeBalancesForAddresses({ chain, providerUrl, toBlock, walletAddresses, ...queryParams }: UseEvmNativeBalancesForAddressesParams = {}) {
  const resolver = useOperationResolver(getNativeBalancesForAddressesOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(walletAddresses && walletAddresses);
  }, [walletAddresses , walletAddresses]);

  const queryKey: [string, Partial<GetNativeBalancesForAddressesRequest>] = useMemo(() => {
    return [
      getNativeBalancesForAddressesOperation.id,
      {
        chain, providerUrl, toBlock, walletAddresses
      },
    ];
  }, [chain, providerUrl, toBlock, walletAddresses]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['walletAddresses' , 'walletAddresses']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    ...queryParams,
    enabled: hasRequiredParams && queryParams.enabled,
  });
}
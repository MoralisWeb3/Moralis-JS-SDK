import Moralis from 'moralis';
import { GetNativeBalancesForAddressesRequest, GetNativeBalancesForAddressesResponse, getNativeBalancesForAddressesOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmNativeBalancesForAddressesParams = Partial<GetNativeBalancesForAddressesRequest>;
export type UseEvmNativeBalancesForAddressesQueryOptions = QueryOptions<GetNativeBalancesForAddressesResponse, UseEvmNativeBalancesForAddressesParams>;

export function useEvmNativeBalancesForAddresses({ chain, toBlock, walletAddresses }: UseEvmNativeBalancesForAddressesParams = {}, queryOptions: UseEvmNativeBalancesForAddressesQueryOptions = {}) {
  const resolver = useOperationResolver(getNativeBalancesForAddressesOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(walletAddresses);
  }, [walletAddresses]);

  const queryKey: [string, Partial<GetNativeBalancesForAddressesRequest>] = useMemo(() => {
    return [
      getNativeBalancesForAddressesOperation.id,
      {
        chain, toBlock, walletAddresses
      },
    ];
  }, [chain, toBlock, walletAddresses]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['walletAddresses']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
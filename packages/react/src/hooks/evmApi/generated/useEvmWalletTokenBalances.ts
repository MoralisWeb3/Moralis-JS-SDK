import Moralis from 'moralis';
import { GetWalletTokenBalancesRequest, GetWalletTokenBalancesResponse, getWalletTokenBalancesOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmWalletTokenBalancesParams = UseMoralisQueryParams<GetWalletTokenBalancesResponse, Partial<GetWalletTokenBalancesRequest>>

export function useEvmWalletTokenBalances({ address, chain, toBlock, tokenAddresses, ...queryParams }: UseEvmWalletTokenBalancesParams = {}) {
  const resolver = useOperationResolver(getWalletTokenBalancesOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address && address);
  }, [address , address]);

  const queryKey: [string, Partial<GetWalletTokenBalancesRequest>] = useMemo(() => {
    return [
      getWalletTokenBalancesOperation.id,
      {
        address, chain, toBlock, tokenAddresses
      },
    ];
  }, [address, chain, toBlock, tokenAddresses]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address' , 'address']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    ...queryParams,
    enabled: hasRequiredParams && queryParams.enabled,
  });
}
import Moralis from 'moralis';
import { GetWalletTokenBalancesRequest, GetWalletTokenBalancesResponse, getWalletTokenBalancesOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseEvmWalletTokenBalancesParams = UseMoralisQueryParams<GetWalletTokenBalancesResponse, GetWalletTokenBalancesRequest>

export function useEvmWalletTokenBalances({ address, chain, toBlock, tokenAddresses, ...queryParams }: UseEvmWalletTokenBalancesParams = {}) {
  const resolver = useOperationResolver(getWalletTokenBalancesOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetWalletTokenBalancesRequest] | undefined = useMemo(() => {
    if (address) {
      return [
      getWalletTokenBalancesOperation.id,
      {
        address, chain, toBlock, tokenAddresses
      },
    ];
    }
      return;
  }, [address, chain, toBlock, tokenAddresses]);

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
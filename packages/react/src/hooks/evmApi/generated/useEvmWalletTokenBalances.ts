import Moralis from 'moralis';
import { GetWalletTokenBalancesRequest, GetWalletTokenBalancesResponse, getWalletTokenBalancesOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmWalletTokenBalancesParams = Partial<GetWalletTokenBalancesRequest>;
export type UseEvmWalletTokenBalancesQueryOptions = QueryOptions<GetWalletTokenBalancesResponse, UseEvmWalletTokenBalancesParams>;

export function useEvmWalletTokenBalances({ address, chain, toBlock, tokenAddresses }: UseEvmWalletTokenBalancesParams = {}, queryOptions: UseEvmWalletTokenBalancesQueryOptions = {}) {
  const resolver = useOperationResolver(getWalletTokenBalancesOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetWalletTokenBalancesRequest>] = useMemo(() => {
    return [
      getWalletTokenBalancesOperation.id,
      {
        address, chain, toBlock, tokenAddresses
      },
    ];
  }, [address, chain, toBlock, tokenAddresses]);

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
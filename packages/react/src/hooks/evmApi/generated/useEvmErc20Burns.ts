import Moralis from 'moralis';
import { GetErc20BurnsRequest, GetErc20BurnsResponse, getErc20BurnsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';


export type UseEvmErc20BurnsParams = GetErc20BurnsRequest;
export type UseEvmErc20BurnsQueryOptions = QueryOptions<GetErc20BurnsResponse, UseEvmErc20BurnsParams>;

export function useEvmErc20Burns({ chain, fromBlock, toBlock, limit, cursor, contractAddresses, excludeContracts, walletAddresses, excludeWallets }: UseEvmErc20BurnsParams = {}, queryOptions: UseEvmErc20BurnsQueryOptions = {}) {
  const resolver = usePaginatedOperationResolver(getErc20BurnsOperation, Moralis.EvmApi.baseUrl);


  const queryKey: [string, GetErc20BurnsRequest] = useMemo(() => {
    return [
      getErc20BurnsOperation.id,
      {
        chain, fromBlock, toBlock, limit, cursor, contractAddresses, excludeContracts, walletAddresses, excludeWallets
      },
    ];
  }, [chain, fromBlock, toBlock, limit, cursor, contractAddresses, excludeContracts, walletAddresses, excludeWallets]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const response = await resolver.fetch(request);
      return response.result;
    },
    enabled: queryOptions.enabled,
  });
}
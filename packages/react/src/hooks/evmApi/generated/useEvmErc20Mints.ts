import Moralis from 'moralis';
import { GetErc20MintsRequest, GetErc20MintsResponse, getErc20MintsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';


export type UseEvmErc20MintsParams = GetErc20MintsRequest;
export type UseEvmErc20MintsQueryOptions = QueryOptions<GetErc20MintsResponse, UseEvmErc20MintsParams>;

export function useEvmErc20Mints({ chain, fromBlock, toBlock, limit, cursor, contractAddresses, excludeContracts, walletAddresses, excludeWallets }: UseEvmErc20MintsParams = {}, queryOptions: UseEvmErc20MintsQueryOptions = {}) {
  const resolver = usePaginatedOperationResolver(getErc20MintsOperation, Moralis.EvmApi.baseUrl);


  const queryKey: [string, GetErc20MintsRequest] = useMemo(() => {
    return [
      getErc20MintsOperation.id,
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
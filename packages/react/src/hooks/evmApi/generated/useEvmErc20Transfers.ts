import Moralis from 'moralis';
import { GetErc20TransfersRequest, GetErc20TransfersResponse, getErc20TransfersOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';


export type UseEvmErc20TransfersParams = GetErc20TransfersRequest;
export type UseEvmErc20TransfersQueryOptions = QueryOptions<GetErc20TransfersResponse, UseEvmErc20TransfersParams>;

export function useEvmErc20Transfers({ chain, fromBlock, toBlock, limit, cursor, contractAddresses, excludeContracts, walletAddresses, excludeWallets }: UseEvmErc20TransfersParams = {}, queryOptions: UseEvmErc20TransfersQueryOptions = {}) {
  const resolver = usePaginatedOperationResolver(getErc20TransfersOperation, Moralis.EvmApi.baseUrl);


  const queryKey: [string, GetErc20TransfersRequest] = useMemo(() => {
    return [
      getErc20TransfersOperation.id,
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
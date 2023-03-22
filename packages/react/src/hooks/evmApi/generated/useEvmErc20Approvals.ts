import Moralis from 'moralis';
import { GetErc20ApprovalsRequest, GetErc20ApprovalsResponse, getErc20ApprovalsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';


export type UseEvmErc20ApprovalsParams = GetErc20ApprovalsRequest;
export type UseEvmErc20ApprovalsQueryOptions = QueryOptions<GetErc20ApprovalsResponse, UseEvmErc20ApprovalsParams>;

export function useEvmErc20Approvals({ chain, fromBlock, toBlock, limit, cursor, contractAddresses, excludeContracts, walletAddresses, excludeWallets }: UseEvmErc20ApprovalsParams = {}, queryOptions: UseEvmErc20ApprovalsQueryOptions = {}) {
  const resolver = usePaginatedOperationResolver(getErc20ApprovalsOperation, Moralis.EvmApi.baseUrl);


  const queryKey: [string, GetErc20ApprovalsRequest] = useMemo(() => {
    return [
      getErc20ApprovalsOperation.id,
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
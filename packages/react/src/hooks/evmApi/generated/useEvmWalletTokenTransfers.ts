import Moralis from 'moralis';
import { GetWalletTokenTransfersRequest, GetWalletTokenTransfersResponse, getWalletTokenTransfersOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmWalletTokenTransfersParams = Partial<GetWalletTokenTransfersRequest>;
export type UseEvmWalletTokenTransfersQueryOptions = QueryOptions<GetWalletTokenTransfersResponse, UseEvmWalletTokenTransfersParams>;

export function useEvmWalletTokenTransfers({ address, chain, fromBlock, toBlock, fromDate, toDate, limit, cursor, disableTotal }: UseEvmWalletTokenTransfersParams = {}, queryOptions: UseEvmWalletTokenTransfersQueryOptions = {}) {
  const resolver = usePaginatedOperationResolver(getWalletTokenTransfersOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetWalletTokenTransfersRequest>] = useMemo(() => {
    return [
      getWalletTokenTransfersOperation.id,
      {
        address, chain, fromBlock, toBlock, fromDate, toDate, limit, cursor, disableTotal
      },
    ];
  }, [address, chain, fromBlock, toBlock, fromDate, toDate, limit, cursor, disableTotal]);

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
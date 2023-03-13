import Moralis from 'moralis';
import { GetTokenTransfersRequest, GetTokenTransfersResponse, getTokenTransfersOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmTokenTransfersParams = UseMoralisQueryParams<GetTokenTransfersResponse, Partial<GetTokenTransfersRequest>>

export function useEvmTokenTransfers({ address, chain, fromBlock, toBlock, fromDate, toDate, limit, cursor, disableTotal, ...queryParams }: UseEvmTokenTransfersParams = {}) {
  const resolver = usePaginatedOperationResolver(getTokenTransfersOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetTokenTransfersRequest>] = useMemo(() => {
    return [
      getTokenTransfersOperation.id,
      {
        address, chain, fromBlock, toBlock, fromDate, toDate, limit, cursor, disableTotal
      },
    ];
  }, [address, chain, fromBlock, toBlock, fromDate, toDate, limit, cursor, disableTotal]);

  return useQuery({
    ...queryParams,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryParams.enabled,
  });
}
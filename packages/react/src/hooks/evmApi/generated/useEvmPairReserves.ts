import Moralis from 'moralis';
import { GetPairReservesRequest, GetPairReservesResponse, getPairReservesOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmPairReservesParams = UseMoralisQueryParams<GetPairReservesResponse, Partial<GetPairReservesRequest>>

export function useEvmPairReserves({ pairAddress, chain, toBlock, toDate, ...queryParams }: UseEvmPairReservesParams = {}) {
  const resolver = useOperationResolver(getPairReservesOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(pairAddress);
  }, [pairAddress]);

  const queryKey: [string, Partial<GetPairReservesRequest>] = useMemo(() => {
    return [
      getPairReservesOperation.id,
      {
        pairAddress, chain, toBlock, toDate
      },
    ];
  }, [pairAddress, chain, toBlock, toDate]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['pairAddress']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    ...queryParams,
    enabled: hasRequiredParams && queryParams.enabled,
  });
}
import Moralis from 'moralis';
import { GetPairReservesRequest, GetPairReservesResponse, getPairReservesOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseEvmPairReservesParams = UseMoralisQueryParams<GetPairReservesResponse, GetPairReservesRequest>

export function useEvmPairReserves({ pairAddress,chain,toBlock,toDate, ...queryParams }: UseEvmPairReservesParams = {}) {
  const resolver = useOperationResolver(getPairReservesOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetPairReservesRequest] | undefined = useMemo(() => {
    if (pairAddress ) {
      return [
      getPairReservesOperation.id,
      {
        pairAddress,chain,toBlock,toDate
      },
    ];
    }
      return;
  }, [pairAddress,chain,toBlock,toDate]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const { result } = await resolver.fetch(request);
      return result;
    },
    ...queryParams,
    enabled: queryKey && queryParams.enabled,
  });
}
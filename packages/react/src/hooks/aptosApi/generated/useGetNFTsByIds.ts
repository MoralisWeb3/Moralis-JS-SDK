import { GetNFTsByIdsOperationRequest, AptosNFTTokenResponse, GetNFTsByIdsOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetNFTsByIdsParams = Partial<GetNFTsByIdsOperationRequest>;
export type UseGetNFTsByIdsQueryOptions = QueryOptions<AptosNFTTokenResponse[], UseGetNFTsByIdsParams>;

export function useGetNFTsByIds({ tokenIds, network }: UseGetNFTsByIdsParams = {},  queryOptions: UseGetNFTsByIdsQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetNFTsByIdsOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(tokenIds);
  }, [tokenIds]);

  const queryKey: [string, Partial<GetNFTsByIdsOperationRequest>] = useMemo(() => {
    return [
      GetNFTsByIdsOperation.operationId,
      {
        tokenIds, network
      },
    ];
  }, [tokenIds, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['tokenIds']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}

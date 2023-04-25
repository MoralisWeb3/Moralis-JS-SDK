import { GetNFTOwnersByTokensOperationRequest, AptosNFTOwnersByTokensResponse, GetNFTOwnersByTokensOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetNFTOwnersByTokensParams = Partial<GetNFTOwnersByTokensOperationRequest>;
export type UseGetNFTOwnersByTokensQueryOptions = QueryOptions<AptosNFTOwnersByTokensResponse, UseGetNFTOwnersByTokensParams>;

export function useGetNFTOwnersByTokens({ limit, offset, cursor, tokenIds, network }: UseGetNFTOwnersByTokensParams = {},  queryOptions: UseGetNFTOwnersByTokensQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetNFTOwnersByTokensOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(limit && tokenIds);
  }, [limit, tokenIds]);

  const queryKey: [string, Partial<GetNFTOwnersByTokensOperationRequest>] = useMemo(() => {
    return [
      GetNFTOwnersByTokensOperation.operationId,
      {
        limit, offset, cursor, tokenIds, network
      },
    ];
  }, [limit, offset, cursor, tokenIds, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['limit', 'tokenIds']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}

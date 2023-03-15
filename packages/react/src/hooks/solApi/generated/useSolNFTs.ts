import Moralis from 'moralis';
import { GetNFTsRequest, GetNFTsResponse, getNFTsOperation } from 'moralis/common-sol-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseSolNFTsParams = Partial<GetNFTsRequest>;
export type UseSolNFTsQueryOptions = QueryOptions<GetNFTsResponse, UseSolNFTsParams>;

export function useSolNFTs({ network, address }: UseSolNFTsParams = {}, queryOptions: UseSolNFTsQueryOptions = {}) {
  const resolver = useOperationResolver(getNFTsOperation, Moralis.SolApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetNFTsRequest>] = useMemo(() => {
    return [
      getNFTsOperation.id,
      {
        network, address
      },
    ];
  }, [network, address]);

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
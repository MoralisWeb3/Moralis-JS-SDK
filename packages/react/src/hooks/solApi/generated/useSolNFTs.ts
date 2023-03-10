import Moralis from 'moralis';
import { GetNFTsRequest, GetNFTsResponse, getNFTsOperation } from 'moralis/common-sol-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseSolNFTsParams = UseMoralisQueryParams<GetNFTsResponse, GetNFTsRequest>

export function useSolNFTs({ network,address, ...queryParams }: UseSolNFTsParams = {}) {
  const resolver = useOperationResolver(getNFTsOperation, Moralis.SolApi.baseUrl);

  const queryKey: [string, GetNFTsRequest] | undefined = useMemo(() => {
      return [
      getNFTsOperation.id,
        {
          network,address
        },
      ]
  }, [network,address]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const response = await resolver.fetch(request);
      return response.result;
    },
    ...queryParams,
    enabled: queryKey && queryParams.enabled,
  });
}
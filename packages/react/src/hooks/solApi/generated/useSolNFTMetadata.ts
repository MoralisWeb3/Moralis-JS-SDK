import Moralis from 'moralis';
import { GetNFTMetadataRequest, GetNFTMetadataResponse, getNFTMetadataOperation } from 'moralis/common-sol-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseSolNFTMetadataParams = UseMoralisQueryParams<GetNFTMetadataResponse, GetNFTMetadataRequest>

export function useSolNFTMetadata({ network,address, ...queryParams }: UseSolNFTMetadataParams = {}) {
  const resolver = useOperationResolver(getNFTMetadataOperation, Moralis.SolApi.baseUrl);

  const queryKey: [string, GetNFTMetadataRequest] | undefined = useMemo(() => {
    if (network &&address ) {
      return [
      getNFTMetadataOperation.id,
      {
        network,address
      },
    ];
    }
      return;
  }, [network,address]);

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